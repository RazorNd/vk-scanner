/*
 * Copyright 2020 Daniil <razornd> Razorenov
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ru.razornd.vk.scanner.service;

import com.vk.api.sdk.objects.wall.WallComment;
import com.vk.api.sdk.objects.wall.WallpostFull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ru.razornd.vk.scanner.component.CommentCrawler;
import ru.razornd.vk.scanner.component.PostCrawler;
import ru.razornd.vk.scanner.model.Comment;
import ru.razornd.vk.scanner.model.Post;
import ru.razornd.vk.scanner.model.events.CommentScanned;
import ru.razornd.vk.scanner.model.events.PostScanned;
import ru.razornd.vk.scanner.repository.CommentRepository;
import ru.razornd.vk.scanner.repository.PostRepository;

import java.time.Instant;
import java.time.Period;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static java.time.OffsetDateTime.now;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScannerService {

    private final CommentCrawler commentCrawler;
    private final PostCrawler postCrawler;
    private final SubjectService subjectService;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    private final SimpMessageSendingOperations messageSendingOperations;

    private static Instant mapDateTime(Integer date) {
        return Instant.ofEpochSecond(date);
    }

    private Post mapPost(WallpostFull wallPostFull) {
        return Post.builder()
                .id(Post.key(wallPostFull.getOwnerId(), wallPostFull.getId()))
                .dateTime(mapDateTime(wallPostFull.getDate()))
                .text(wallPostFull.getText())
                .from(subjectService.getSubject(wallPostFull.getFromId()))
                .owner(subjectService.getSubject(wallPostFull.getOwnerId()))
                .comments(scanCommentFor(wallPostFull.getOwnerId(), wallPostFull.getId()))
                .build();
    }

    private List<Comment> scanCommentFor(int ownerId, int postId) {
        return commentCrawler.forPost(postId, ownerId)
                .getAllComments()
                .filter(wallComment -> wallComment.getDeleted() == null || !wallComment.getDeleted())
                .map(wallComment -> mapComment(wallComment, ownerId, postId))
                .peek(comment -> messageSendingOperations.convertAndSend(CommentScanned.EVENT_TOPIC, CommentScanned.of(comment)))
                .collect(Collectors.toList());
    }

    private Comment mapComment(WallComment wallComment, int ownerId, int postId) {
        return Comment.builder()
                .id(Comment.key(ownerId, postId, wallComment.getId()))
                .dateTime(mapDateTime(wallComment.getDate()))
                .from(subjectService.getSubject(wallComment.getFromId()))
                .text(wallComment.getText())
                .build();
    }

    public void scanGroup(int groupId, Period period) {
        final AtomicInteger counter = new AtomicInteger(0);
        final Instant startDateTime = now().minus(period).toInstant();
        postCrawler.fromGroup(groupId)
                .getAllPosts()
                .peek(post -> log.info("Scanned {} postID {}", counter.incrementAndGet(), post.getId()))
                .map(this::mapPost)
                .takeWhile(post -> post.getDateTime().isAfter(startDateTime))
                .peek(post -> messageSendingOperations.convertAndSend(PostScanned.EVENT_TOPIC, PostScanned.of(post)))
                .peek(postRepository::save)
                .map(Post::getComments)
                .flatMap(List::stream)
                .forEach(commentRepository::save);
    }
}

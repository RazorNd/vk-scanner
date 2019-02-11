/*
 * Copyright 2019 Daniil <razornd> Razorenov
 *
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
import com.vk.api.sdk.objects.wall.WallPostFull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.razornd.vk.scanner.component.CommentCrawler;
import ru.razornd.vk.scanner.component.PostCrawler;
import ru.razornd.vk.scanner.model.Comment;
import ru.razornd.vk.scanner.model.Post;
import ru.razornd.vk.scanner.model.User;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScannerService {

    private final CommentCrawler commentCrawler;
    private final PostCrawler postCrawler;
    private final UserService userService;

    public static Predicate<Post> postContainComment(Predicate<Comment> predicate) {
        return post -> post
                .getComments()
                .stream()
                .anyMatch(predicate);
    }

    public static Predicate<Post> postFrom(int fromId) {
        return post -> post.isFrom(fromId);
    }

    public static Predicate<Post> postFrom(User user) {
        return postFrom(user.getId());
    }

    public static Predicate<Comment> commentFrom(int userId) {
        return comment -> comment.isFrom(userId);
    }

    public List<Post> scan(int groupId, Predicate<Post> filter) {
        AtomicInteger counter = new AtomicInteger(0);
        return postCrawler.fromGroup(groupId)
                .getAllPosts()
                .limit(100)
                .peek(post -> log.info("Scanned {} postID {}", counter.incrementAndGet(), post.getId()))
                .map(this::mapPost)
                .filter(filter)
                .sorted(Comparator.comparing(Post::getDateTime).reversed())
                .collect(Collectors.toList());
    }

    private Post mapPost(WallPostFull wallPostFull) {
        final Post result = Post.builder()
                .id(wallPostFull.getId())
                .dateTime(mapDateTime(wallPostFull.getDate()))
                .text(wallPostFull.getText())
                .from(getUser(wallPostFull.getFromId()))
                .build();

        commentCrawler.forPost(wallPostFull.getId(), wallPostFull.getOwnerId())
                .getAllComments()
                .map(this::mapComment)
                .forEach(result::addComment);

        return result;
    }

    private Comment mapComment(WallComment wallComment) {
        return Comment.builder()
                .id(wallComment.getId())
                .dateTime(mapDateTime(wallComment.getDate()))
                .from(getUser(wallComment.getFromId()))
                .text(wallComment.getText())
                .build();
    }

    private User getUser(Integer fromId) {
        return Optional.ofNullable(fromId)
                .filter(id -> id > 0)
                .map(Object::toString)
                .map(userService::getUser)
                .orElse(null);
    }

    private LocalDateTime mapDateTime(Integer date) {
        return LocalDateTime.ofEpochSecond(date, 0, ZoneOffset.ofHours(3));
    }
}

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

package ru.razornd.vk.scanner.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import ru.razornd.vk.scanner.model.Comment;
import ru.razornd.vk.scanner.model.Group;
import ru.razornd.vk.scanner.model.Post;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static ru.razornd.vk.scanner.stub.Users.createUser;

@DataMongoTest
public class PostRepositoryTest {

    private static final Post.PostKey POST_KEY = Post.key(1, 1);

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @AfterEach
    public void tearDown() {
        commentRepository.deleteAll();
        postRepository.deleteAll();
    }

    @Test
    public void insert() {
        final Post post = Post.builder()
                .id(POST_KEY)
                .dateTime(Instant.now())
                .from(createUser())
                .owner(Group.builder().id(-1).build())
                .text("Test POSTS")
                .comments(List.of(
                        Comment.builder()
                                .id(Comment.key(1, 1, 1))
                                .dateTime(Instant.now())
                                .text("first comment")
                                .from(createUser())
                                .build(),
                        Comment.builder()
                                .id(Comment.key(1, 2, 1))
                                .dateTime(Instant.now())
                                .text("second comment")
                                .from(createUser())
                                .build()
                ))
                .build();

        final Post saved = postRepository.save(post);

        commentRepository.saveAll(post.getComments());

        assertThat(saved)
                .as("Пост должен сохраниться")
                .isNotNull();

        final Optional<Post> fromDB = postRepository.findById(POST_KEY);

        assertThat(fromDB)
                .as("Сохранненый пост должен загружаться из базы")
                .isNotEmpty()
                .get()
                .hasFieldOrPropertyWithValue("from", createUser())
                .extracting(Post::getComments)
                .asList()
                .as("В сохраненном посте должно находится сохраняемое число комментариев.")
                .hasSize(2);
    }
}

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

package ru.razornd.vk.scanner.repository;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.junit4.SpringRunner;
import ru.razornd.vk.scanner.model.Comment;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@RunWith(SpringRunner.class)
public class CommentRepositoryTest {

    @Autowired
    CommentRepository repository;

    @Autowired
    MongoOperations operations;

    @After
    public void tearDown() {
        repository.deleteAll();
    }

    @Test
    public void insert() {
        final Comment testComment = Comment.builder()
                .id(Comment.key(1, 1, 1))
                .dateTime(LocalDateTime.now())
                .text("test comment")
                .build();

        final Comment inserted = repository.insert(testComment);

        assertThat(inserted.getId())
                .as("ID не должен измениться")
                .isEqualTo(Comment.key(1, 1, 1));

        final Optional<Comment> fromDB = repository.findById(Comment.key(1, 1, 1));

        assertThat(fromDB)
                .as("Сохранненый коментарий должен находится")
                .isNotEmpty();
    }

    @Test(expected = DuplicateKeyException.class)
    public void duplicate() {
        repository.insert(Comment.builder()
                .id(Comment.key(1, 1, 1))
                .dateTime(LocalDateTime.now())
                .text("test comment")
                .build());

        repository.insert(Comment.builder()
                .id(Comment.key(1, 1, 1))
                .dateTime(LocalDateTime.now())
                .text("test comment")
                .build());
    }

    @Test
    public void findOrUpdate() {

    }
}
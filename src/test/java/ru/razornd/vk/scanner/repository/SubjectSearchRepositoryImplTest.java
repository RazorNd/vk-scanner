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
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.junit4.SpringRunner;
import ru.razornd.vk.scanner.model.Group;
import ru.razornd.vk.scanner.model.Subject;
import ru.razornd.vk.scanner.model.User;
import ru.razornd.vk.scanner.stub.Users;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataMongoTest
public class SubjectSearchRepositoryImplTest {
    private static final int ID = 123;
    private static final User USER = Users.defaultUserBuilder()
            .id(ID)
            .build();
    private static final Group GROUP = Group.builder()
            .name("Group")
            .id(321)
            .build();

    @Autowired
    SubjectSearchRepositoryImpl repository;

    @Autowired
    MongoOperations operations;

    @After
    public void clean() {
        operations.dropCollection(Subject.class);
    }

    @Before
    public void insertDefault() {
        operations.save(USER);
        operations.save(GROUP);
    }

    @Test
    public void findByName() {
        final Page<Subject> byName = repository.findByName("Ива", Pageable.unpaged());

        assertThat(byName.get()).contains(USER);
    }
}

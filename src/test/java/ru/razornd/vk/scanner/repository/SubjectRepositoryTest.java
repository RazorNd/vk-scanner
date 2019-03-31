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

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.razornd.vk.scanner.model.Group;
import ru.razornd.vk.scanner.model.User;
import ru.razornd.vk.scanner.stub.Users;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@RunWith(SpringRunner.class)
public class SubjectRepositoryTest {

    private static final int ID = 123;

    @Autowired
    SubjectRepository repository;

    @Test
    public void saveAndFindById() {
        final User user = Users.defaultUserBuilder()
                .id(ID)
                .build();

        final Group group = Group.builder()
                .name("Group")
                .id(321)
                .build();

        repository.save(user);
        repository.save(group);

        assertThat(repository.findById(ID))
                .isNotEmpty()
                .get()
                .isEqualTo(user);

        assertThat(repository.findById(321))
                .isNotEmpty()
                .get()
                .isEqualTo(group);
    }
}

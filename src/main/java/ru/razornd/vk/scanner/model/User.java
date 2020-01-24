/*
 * Copyright (c) 2020 Daniil <razornd> Razorenov
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

package ru.razornd.vk.scanner.model;

import com.vk.api.sdk.objects.base.Sex;
import lombok.*;

import java.net.URL;

@Getter
@Setter
@ToString
@SubjectModel
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractSubject {

    private final String firstName;
    private final String lastName;
    private final String birthday;
    private final String screenName;
    private final Sex sex;

    @Builder
    public User(int id, URL icon, String firstName, String lastName, String birthday, String screenName, Sex sex) {
        super(id, icon);
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.screenName = screenName;
        this.sex = sex;
    }

    @Override
    public String getName() {
        return firstName + " " + lastName;
    }
}

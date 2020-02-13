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

package ru.razornd.vk.scanner.model;

import lombok.*;

import java.net.URL;

@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = true)
public class Group extends AbstractSubject {

    private final String name;
    private final String description;

    @Builder
    public Group(int id, URL icon, String name, String description) {
        super(id, icon);
        this.name = name;
        this.description = description;
    }
}

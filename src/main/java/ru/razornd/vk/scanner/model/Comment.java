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

package ru.razornd.vk.scanner.model;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Builder
@Getter
public class Comment {

    private final int id;
    private final LocalDateTime dateTime;
    private final String text;
    private final User from;

    public boolean isFrom(int fromId) {
        return Optional.ofNullable(from)
                .map(User::getId)
                .map(id -> id == fromId)
                .orElse(false);
    }

    @Override
    public String toString() {
        return "Коммент: " + from + " " + dateTime + "\n" + text + "\n";
    }
}

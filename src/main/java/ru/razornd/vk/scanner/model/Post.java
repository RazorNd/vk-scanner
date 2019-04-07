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
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.unmodifiableList;

@Data
@Builder
@Document
@SubjectModel
public class Post {
    @Id
    private final PostKey id;
    private final Instant dateTime;
    private final String text;
    private final Subject from;
    private final Subject owner;
    @DBRef
    @Builder.Default
    private final List<Comment> comments = new ArrayList<>();

    public List<Comment> getComments() {
        return unmodifiableList(comments);
    }

    public static PostKey key(int ownerId, int postId) {
        return new PostKey(ownerId, postId);
    }

    @RequiredArgsConstructor
    @Data
    public static class PostKey {
        private final int ownerId;
        private final int postId;
    }
}

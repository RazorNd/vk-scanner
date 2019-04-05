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
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document
public class Comment {
    @Id
    private final CommentKey id;
    private final LocalDateTime dateTime;
    private final String text;
    private final Subject from;

    public static CommentKey key(int ownerId, int postId, int commentId) {
        return new CommentKey(ownerId, postId, commentId);
    }

    @RequiredArgsConstructor
    @Data
    public static class CommentKey {
        private final int ownerId;
        private final int postId;
        private final int commentId;

        public Post.PostKey toPostKey() {
            return Post.key(ownerId, postId);
        }
    }
}

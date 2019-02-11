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

package ru.razornd.vk.scanner.component;

import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import com.vk.api.sdk.objects.wall.WallComment;
import com.vk.api.sdk.queries.wall.WallGetCommentsQuery;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import java.util.List;
import java.util.stream.Stream;

@RequiredArgsConstructor
public class ApiCommentCrawler implements CommentCrawler {

    private static final int COUNT = 100;

    private final VkApiClient client;
    private final ServiceActor actor;

    @Override
    public Comments forPost(int postId, int ownerId) {
        return new EagerComments(postId, ownerId);
    }

    @RequiredArgsConstructor
    class EagerComments implements Comments {

        private final int postId;
        private final int ownerId;

        private int offset = 0;

        @Override
        @SneakyThrows
        public List<WallComment> getNextComments() {
            return defaultPostQuery()
                    .count(COUNT)
                    .needLikes(true)
                    .offset(COUNT * offset++)
                    .execute()
                    .getItems();
        }

        @Override
        @SneakyThrows
        public Stream<WallComment> getAllComments() {
            int count = defaultPostQuery()
                    .count(1)
                    .needLikes(false)
                    .execute()
                    .getCount();

            return Stream.generate(this::getNextComments)
                    .flatMap(List::stream)
                    .limit(count);
        }

        private WallGetCommentsQuery defaultPostQuery() {
            return client.wall()
                    .getComments(actor, postId)
                    .ownerId(ownerId);
        }
    }
}

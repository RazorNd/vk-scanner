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

package ru.razornd.vk.scanner.component;

import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import com.vk.api.sdk.objects.wall.WallpostFull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import java.util.List;
import java.util.stream.Stream;

@RequiredArgsConstructor
public class ApiPostCrawler implements PostCrawler {
    private static final int COUNT = 100;

    private final VkApiClient client;
    private final ServiceActor actor;

    @Override
    public Posts fromGroup(int groutId) {
        return new EagerPosts(groutId);
    }

    @RequiredArgsConstructor
    class EagerPosts implements Posts {
        private final Integer groupId;
        private int offset = 0;

        @Override
        @SneakyThrows
        public List<WallpostFull> getNextPosts() {
            return client.wall()
                    .get(actor)
                    .ownerId(-groupId)
                    .count(COUNT)
                    .offset(COUNT * offset++)
                    .execute()
                    .getItems();
        }

        @Override
        public Stream<WallpostFull> getAllPosts() {
            return Stream.generate(this::getNextPosts)
                    .takeWhile(list -> !list.isEmpty())
                    .flatMap(List::stream);
        }
    }
}

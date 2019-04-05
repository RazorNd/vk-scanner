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
import com.vk.api.sdk.objects.groups.GroupFull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import ru.razornd.vk.scanner.model.Group;

import java.util.List;

import static com.vk.api.sdk.queries.groups.GroupField.DESCRIPTION;

@RequiredArgsConstructor
public class ApiGroupFetcher implements GroupFetcher {

    private final VkApiClient client;
    private final ServiceActor actor;

    @Override
    @SneakyThrows
    public Group fetch(String groupId) {
        final List<GroupFull> groups = client.groups()
                .getById(actor)
                .groupId(groupId)
                .fields(DESCRIPTION)
                .execute();
        if (groups.size() != 1) {
            throw new IllegalArgumentException(groupId + " is illegal groupId");
        }
        final GroupFull groupFull = groups.get(0);

        return Group.builder()
                .id(groupFull.getId())
                .name(groupFull.getName())
                .description(groupFull.getDescription())
                .icon(groupFull.getPhoto200())
                .build();
    }
}

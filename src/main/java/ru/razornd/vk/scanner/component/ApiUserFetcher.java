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

package ru.razornd.vk.scanner.component;

import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import com.vk.api.sdk.objects.users.UserFull;
import com.vk.api.sdk.objects.users.UserXtrCounters;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import ru.razornd.vk.scanner.model.User;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.vk.api.sdk.client.Lang.RU;
import static com.vk.api.sdk.objects.users.Fields.*;

@RequiredArgsConstructor
public class ApiUserFetcher implements UserFetcher {

    private final VkApiClient client;
    private final ServiceActor actor;

    @Override
    public User fetch(String userId) {
        List<UserXtrCounters> users = doFetch(Collections.singletonList(userId));
        if (users.size() != 1) {
            throw new IllegalArgumentException(userId + " is illegal userId");
        }
        return mapUser(users.get(0));
    }

    @Override
    public List<User> fetch(List<String> userIds) {
        return doFetch(userIds).stream()
                .map(this::mapUser)
                .collect(Collectors.toList());
    }

    @SneakyThrows
    private List<UserXtrCounters> doFetch(List<String> userName) {
        return client.users()
                .get(actor)
                .userIds(userName)
                .fields(SEX, BDATE, SCREEN_NAME, ABOUT, PHOTO_100)
                .lang(RU)
                .execute();
    }

    private User mapUser(UserFull userFull) {
        return User.builder()
                .id(userFull.getId())
                .firstName(userFull.getFirstName())
                .lastName(userFull.getLastName())
                .sex(userFull.getSex())
                .birthday(userFull.getBdate())
                .screenName(userFull.getScreenName())
                .icon(userFull.getPhoto100())
                .build();
    }
}

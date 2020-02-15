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

package ru.razornd.vk.scanner.config;

import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.razornd.vk.scanner.component.*;

@Configuration
public class CrawlerConfiguration {
    @Bean
    public PostCrawler apiPostCrawler(VkApiClient client, ServiceActor actor) {
        return new ApiPostCrawler(client, actor);
    }

    @Bean
    public CommentCrawler apiCommentCrawler(VkApiClient client, ServiceActor actor) {
        return new ApiCommentCrawler(client, actor);
    }

    @Bean
    public UserFetcher apiUserFetcher(VkApiClient client, ServiceActor actor) {
        return new ApiUserFetcher(client, actor);
    }

    @Bean
    public GroupFetcher apiGroupFetcher(VkApiClient client, ServiceActor actor) {
        return new ApiGroupFetcher(client, actor);
    }
}

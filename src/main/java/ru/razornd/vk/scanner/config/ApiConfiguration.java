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

import com.vk.api.sdk.client.TransportClient;
import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import com.vk.api.sdk.httpclient.HttpTransportClient;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.razornd.vk.scanner.properties.ClientProperty;

@Configuration
@EnableConfigurationProperties(ClientProperty.class)
public class ApiConfiguration {

    @Bean
    public TransportClient transportClient() {
        return HttpTransportClient.getInstance();
    }

    @Bean
    public VkApiClient vkApiClient(TransportClient transportClient) {
        return new VkApiClient(transportClient);
    }

    @Bean
    public ServiceActor clientCredentials(ClientProperty property) {
        return new ServiceActor(property.getClientId(), property.getClientSecret(), property.getServiceKey());
    }
}

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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.vk.api.sdk.client.TransportClient;
import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.ServiceActor;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import ru.razornd.vk.api.client.RestOperationTransportClient;
import ru.razornd.vk.scanner.gson.URLTypeAdapter;
import ru.razornd.vk.scanner.properties.ClientProperty;

import java.net.URL;

@Configuration
@EnableConfigurationProperties(ClientProperty.class)
public class ApiConfiguration {

    private static final int DEFAULT_RETRY_ATTEMPTS_INTERNAL_SERVER_ERROR_COUNT = 3;

    @Bean
    public TransportClient transportClient(RestTemplateBuilder builder) {
        final CloseableHttpClient httpClient = HttpClientBuilder.create()
                .useSystemProperties()
                .disableCookieManagement()
                .build();

        return new RestOperationTransportClient(builder.requestFactory(() -> new HttpComponentsClientHttpRequestFactory(
                httpClient)));
    }

    @Bean
    public VkApiClient vkApiClient(TransportClient transportClient, GsonBuilder gsonBuilder) {
        final Gson gson = gsonBuilder.registerTypeAdapter(URL.class, new URLTypeAdapter())
                .create();

        return new VkApiClient(transportClient, gson, DEFAULT_RETRY_ATTEMPTS_INTERNAL_SERVER_ERROR_COUNT);
    }

    @Bean
    public ServiceActor clientCredentials(ClientProperty property) {
        return new ServiceActor(property.getClientId(), property.getClientSecret(), property.getServiceKey());
    }

}

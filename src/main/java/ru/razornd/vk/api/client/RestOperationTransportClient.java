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

package ru.razornd.vk.api.client;

import com.vk.api.sdk.client.ClientResponse;
import com.vk.api.sdk.client.TransportClient;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestOperations;

import java.io.File;
import java.util.Optional;

public class RestOperationTransportClient implements TransportClient {

    private final RestOperations operations;

    public RestOperationTransportClient(RestTemplateBuilder builder) {
        operations = builder.errorHandler(new IgnoreErrorHandler())
                .build();
    }

    @Override
    public ClientResponse get(String url) {
        return get(url, null);
    }

    @Override
    public ClientResponse get(String url, String contentType) {
        return exchange(HttpMethod.GET, url, null, contentType);
    }

    @Override
    public ClientResponse post(String url) {
        return post(url, null);
    }

    @Override
    public ClientResponse post(String url, String body) {
        return post(url, body, (String) null);
    }

    @Override
    public ClientResponse post(String url, String fileName, File file) {
        throw new UnsupportedOperationException();
    }

    @Override
    public ClientResponse post(String url, String body, String contentType) {
        return exchange(HttpMethod.POST, url, body, contentType);
    }

    @Override
    public ClientResponse delete(String url) {
        return delete(url, null);
    }

    @Override
    public ClientResponse delete(String url, String body) {
        return delete(url, body, null);
    }

    @Override
    public ClientResponse delete(String url, String body, String contentType) {
        return exchange(HttpMethod.DELETE, url, body, contentType);
    }

    private ClientResponse clientResponse(ResponseEntity<String> entity) {
        return new ClientResponse(entity.getStatusCodeValue(),
                entity.getBody(),
                entity.getHeaders()
                        .toSingleValueMap()
        );
    }

    private ClientResponse exchange(HttpMethod method, String url, String body, String contentType) {
        final HttpHeaders headers = new HttpHeaders();

        headers.setContentType(Optional.ofNullable(contentType)
                .map(MediaType::valueOf)
                .orElse(MediaType.APPLICATION_FORM_URLENCODED));

        final ResponseEntity<String> exchange = operations.exchange(url,
                method,
                new HttpEntity<>(body, headers),
                String.class
        );

        return clientResponse(exchange);
    }

    private static class IgnoreErrorHandler implements ResponseErrorHandler {
        @Override
        public boolean hasError(@NonNull ClientHttpResponse response) { return false; }

        @Override
        public void handleError(@NonNull ClientHttpResponse response) { }
    }
}

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
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.mock.http.client.MockClientHttpRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.client.RequestMatcher;
import org.springframework.test.web.client.response.DefaultResponseCreator;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import ru.razornd.vk.scanner.config.ApiConfiguration;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.function.Consumer;

import static java.lang.String.format;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(ApiConfiguration.class)
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
public abstract class AbstractCrawlerTest {
    @Autowired
    VkApiClient client;
    @Autowired
    ServiceActor actor;
    @Autowired
    MockRestServiceServer server;

    protected void expectServerRequest(int page) {
        expectServerRequest(page, formData(page * 100));
    }

    protected void expectServerRequest(int page, RequestMatcher contentMatcher) {
        server.expect(once(), requestTo(expectedUri()))
                .andExpect(method(POST))
                .andExpect(content().contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(contentMatcher)
                .andRespond(withSuccessResponse(page));
    }

    private RequestMatcher formData(int offset) {
        return formData(content -> content.add("offset", Integer.toString(offset)));
    }

    private RequestMatcher formData(Consumer<MultiValueMap<String, String>> additionalParameters) {
        MultiValueMap<String, String> content = new LinkedMultiValueMap<>();

        defaultHeaders(content);

        additionalParameters.accept(content);

        return request -> {
            HttpInputMessage inputMessage = new HttpInputMessage() {
                @Override
                public InputStream getBody() {
                    MockClientHttpRequest mockRequest = (MockClientHttpRequest) request;
                    return new ByteArrayInputStream(mockRequest.getBodyAsBytes());
                }

                @Override
                public HttpHeaders getHeaders() {
                    return request.getHeaders();
                }
            };
            FormHttpMessageConverter converter = new FormHttpMessageConverter();

            assertThat(converter.read(null, inputMessage)).as("Request content")
                    .containsAllEntriesOf(content);
        };
    }

    protected void defaultHeaders(MultiValueMap<String, String> content) {
        content.add("access_token", actor.getAccessToken());
        content.add("client_secret", actor.getClientSecret());
    }

    private DefaultResponseCreator withSuccessResponse(int responseNumber) {
        return withSuccess(
                new ClassPathResource(format("api/responses/%s/response-%d.json", getType(), responseNumber + 1)),
                APPLICATION_JSON
        );
    }

    protected abstract String getType();

    protected abstract String expectedUri();
}

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

import com.vk.api.sdk.objects.wall.WallComment;
import org.junit.Before;
import org.junit.Test;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

public class ApiCommentCrawlerTest extends AbstractCrawlerTest {

    private static final int POST_ID = 1010195;
    private static final int OWNER_ID = -22822305;

    ApiCommentCrawler crawler;

    @Before
    public void setUp() {
        crawler = new ApiCommentCrawler(client, actor);
    }

    @Test
    public void forPost() {

        expectServerRequest(0);
        expectServerRequest(formData(data -> data.add("comment_id", "1010196")), withSuccessResponse("thread-1010196"));
        expectServerRequest(formData(100), withSuccessResponse("empty"));
        expectServerRequest(formData(data -> data.add("comment_id", "1010197")), withSuccessResponse("thread-1010197"));
        expectServerRequest(formData(100), withSuccessResponse("empty"));
        expectServerRequest(1);
        expectServerRequest(2);
        expectServerRequest(formData(300), withSuccessResponse("empty"));

        final List<WallComment> comments = crawler.forPost(POST_ID, OWNER_ID)
                .getAllComments()
                .collect(Collectors.toList());

        assertThat(comments).size()
                .isEqualTo(16);

        server.verify();
    }

    @Override
    protected void defaultHeaders(MultiValueMap<String, String> content) {
        super.defaultHeaders(content);
        content.add("post_id", Integer.toString(POST_ID));
        content.add("owner_id", Integer.toString(OWNER_ID));
    }

    @Override
    protected String getType() {
        return "wall";
    }

    @Override
    protected String expectedUri() {
        return "https://api.vk.com/method/wall.getComments";
    }

    @Test
    public void problemJson() {
        expectServerRequest(formData(0), withSuccessResponse("problem"));
        expectServerRequest(formData(100), withSuccessResponse("empty"));

        final List<WallComment> comments = crawler.forPost(POST_ID, OWNER_ID)
                .getAllComments()
                .collect(Collectors.toList());

        assertThat(comments).size()
                .isEqualTo(24);
    }
}

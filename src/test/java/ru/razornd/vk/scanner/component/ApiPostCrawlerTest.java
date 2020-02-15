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

import com.vk.api.sdk.objects.wall.WallpostFull;
import org.junit.Before;
import org.junit.Test;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;


public class ApiPostCrawlerTest extends AbstractCrawlerTest {

    private static final int GROUT_ID = 22822305;

    ApiPostCrawler crawler;

    @Before
    public void setUp() {
        crawler = new ApiPostCrawler(client, actor);
    }

    @Test
    public void fromGroup() {
        int requestNumber = 0;
        expectServerRequest(requestNumber++);
        expectServerRequest(requestNumber++);
        expectServerRequest(requestNumber++);
        expectServerRequest(requestNumber++);
        expectServerRequest(requestNumber);

        final List<WallpostFull> posts = crawler.fromGroup(GROUT_ID)
                .getAllPosts()
                .collect(Collectors.toList());

        assertThat(posts).size()
                .isEqualTo(390);
    }

    @Override
    protected void defaultHeaders(MultiValueMap<String, String> content) {
        super.defaultHeaders(content);
        content.add("owner_id", Integer.toString(-GROUT_ID));
    }

    @Override
    protected String getType() {
        return "post";
    }

    @Override
    protected String expectedUri() {
        return "https://api.vk.com/method/wall.get";
    }
}

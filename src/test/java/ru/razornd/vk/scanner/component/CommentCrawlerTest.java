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

import com.vk.api.sdk.objects.wall.WallComment;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@Disabled("Because CI can't provide application-dev.yml and rate-miter for API not implemented")
@SpringBootTest
@ActiveProfiles("dev")
public class CommentCrawlerTest {

    @Autowired
    CommentCrawler crawler;

    @Test
    public void forPost() {
        final List<WallComment> collect = crawler.forPost(2061390, -65836378)
                .getAllComments()
                .collect(Collectors.toList());

        assertThat(collect).isNotEmpty();
    }
}

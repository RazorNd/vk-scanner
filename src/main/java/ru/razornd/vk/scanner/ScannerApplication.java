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

package ru.razornd.vk.scanner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import ru.razornd.vk.scanner.model.Post;
import ru.razornd.vk.scanner.service.ScannerService;
import ru.razornd.vk.scanner.service.UserService;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

import static ru.razornd.vk.scanner.service.ScannerService.*;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
@EnableCaching
public class ScannerApplication implements CommandLineRunner {

    private final ScannerService scannerService;
    private final UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(ScannerApplication.class, args);
    }

    @Override
    public void run(String... args) {
        final Predicate<Post> postPredicate = Arrays.stream(args)
                .map(this::postOrCommentFrom)
                .reduce(Predicate::or)
                .orElseThrow(IllegalArgumentException::new);

        List<Post> posts = scannerService.scan(79364564, postPredicate);

        posts.forEach(post -> log.info(post.toString()));
    }

    private Predicate<Post> postOrCommentFrom(int userId) {
        return postContainComment(commentFrom(userId)).or(postFrom(userId));
    }

    private Predicate<Post> postOrCommentFrom(String user) {
        return postOrCommentFrom(userService.getUser(user).getId());
    }
}


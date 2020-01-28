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

package ru.razornd.vk.scanner.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;
import ru.razornd.vk.scanner.model.Post;
import ru.razornd.vk.scanner.service.PostService;


@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostsController {

    private final PostService service;

    @CrossOrigin
    @GetMapping
    public PagedModel<EntityModel<Post>> getPosts(@RequestParam(name = "f") int fromId,
                                                  @RequestParam(name = "o", defaultValue = "0") int ownerId,
                                                  Pageable pageable,
                                                  PagedResourcesAssembler<Post> assembler) {

        return assembler.toModel(service.searchPosts(fromId, ownerId, pageable));
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }
}

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

package ru.razornd.vk.scanner.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.*;
import ru.razornd.vk.scanner.model.Subject;
import ru.razornd.vk.scanner.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService service;

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable int id) {
        return service.getSubject(id);
    }

    @GetMapping
    public PagedResources<Resource<Subject>> getSubjects(@RequestParam("f") String filter,
                                                         @RequestParam("type") String type,
                                                         Pageable pageable,
                                                         PagedResourcesAssembler<Subject> assembler) {
        return assembler.toResource(service.findSubjects(filter, type, pageable));
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }
}

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

package ru.razornd.vk.scanner.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.razornd.vk.scanner.component.GroupFetcher;
import ru.razornd.vk.scanner.component.UserFetcher;
import ru.razornd.vk.scanner.model.Subject;
import ru.razornd.vk.scanner.repository.SubjectRepository;

import java.util.function.Function;

@RequiredArgsConstructor
@Service
@Slf4j
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository repository;
    private final UserFetcher userFetcher;
    private final GroupFetcher groupFetcher;

    @Override
    @Cacheable("subject")
    public Subject getSubject(int subjectId) {
        return repository.findById(subjectId).orElseGet(() -> synchronize(subjectId));
    }

    @Override
    public Subject synchronize(int subjectId) {
        log.debug("Synchronize subject: {}", subjectId);
        return repository.save(choseRepository(subjectId).compose(this::prepareId).apply(subjectId));
    }

    @Override
    public Page<Subject> findSubjects(String filter, String type, Pageable pageable) {
        return repository.findByName(filter, pageable);
    }

    @Override
    public long count() {
        return repository.count();
    }

    private int prepareId(int subjectId) {
        return Math.abs(subjectId);
    }

    private Function<Integer, Subject> choseRepository(int subjectId) {
        if (subjectId > 0) {
            log.trace("For subject {}, chose UserFetcher", subjectId);
            return userFetcher::fetch;
        } else {
            log.trace("For subject {}, chose GroupFetcher", subjectId);
            return groupFetcher::fetch;
        }
    }
}

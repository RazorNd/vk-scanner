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

package ru.razornd.vk.scanner.repository;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.CountOperation;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import ru.razornd.vk.scanner.model.Subject;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Stream.concat;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.ConditionalOperators.ifNull;
import static org.springframework.data.mongodb.core.aggregation.StringOperators.valueOf;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
@RequiredArgsConstructor
public class SubjectSearchRepositoryImpl implements SubjectSearchRepository {

    private static final String COUNT = "count";
    private static final String NAME = "name";
    private static final String FIRST_NAME = "firstName";
    private static final String LAST_NAME = "lastName";
    private static final String DELIMITER = " ";
    private static final String SEARCH = "search";
    private static final CountResult ZERO_COUNT = new CountResult(0);

    private final MongoOperations operations;

    @Override
    public Page<Subject> findByName(String name, Pageable pageable) {

        return PageableExecutionUtils.getPage(
                aggregatePaged(searchOperations(name), pageable),
                pageable,
                aggregateCount(searchOperations(name))::getCount
        );
    }

    private List<Subject> aggregatePaged(Stream<AggregationOperation> searchOperations, Pageable pageable) {
        return aggregate(concat(
                searchOperations,
                pageableOperations(pageable)
        ), Subject.class).getMappedResults();
    }

    private CountResult aggregateCount(Stream<AggregationOperation> searchOperations) {
        final CountResult countResult = aggregate(concat(
                searchOperations,
                countOperations()
        ), CountResult.class).getUniqueMappedResult();

        return ofNullable(countResult).orElse(ZERO_COUNT);
    }

    private <T> AggregationResults<T> aggregate(Stream<AggregationOperation> operations, Class<T> outputType) {
        return this.operations.aggregate(
                newAggregation(
                        operations.collect(toList())
                ),
                this.operations.getCollectionName(Subject.class),
                outputType
        );
    }

    private Stream<AggregationOperation> searchOperations(String name) {
        return Stream.of(
                context -> new Document("$addFields", new Document(SEARCH, ifNull(NAME).thenValueOf(
                        valueOf(FIRST_NAME)
                                .concat(DELIMITER)
                                .concatValueOf(LAST_NAME)
                ).toDocument(context))),
                match(where(SEARCH).regex(name))
        );
    }

    private Stream<AggregationOperation> pageableOperations(Pageable pageable) {

        final Stream.Builder<AggregationOperation> builder = Stream.builder();

        Optional.of(pageable.getSort())
                .filter(Sort::isSorted)
                .map(Aggregation::sort)
                .ifPresent(builder::add);

        if (pageable.isPaged()) {
            builder.add(skip(pageable.getOffset()))
                    .add(limit(pageable.getPageSize()));
        }

        return builder.build();
    }

    private Stream<CountOperation> countOperations() {
        return Stream.of(count().as(COUNT));
    }


    @Data
    @RequiredArgsConstructor
    @SuppressWarnings("WeakerAccess")
    static class CountResult {
        private final long count;
    }
}

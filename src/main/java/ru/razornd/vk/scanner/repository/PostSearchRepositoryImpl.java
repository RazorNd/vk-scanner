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

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.repository.support.SpringDataMongodbQuery;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import ru.razornd.vk.scanner.model.Post;

import java.util.function.UnaryOperator;

import static ru.razornd.vk.scanner.model.QComment.comment;
import static ru.razornd.vk.scanner.model.QPost.post;

@RequiredArgsConstructor
@Repository
public class PostSearchRepositoryImpl implements PostSearchRepository {

    private final MongoOperations mongoOperations;

    @Override
    public Page<Post> findAllWithFromId(int from, Pageable pageable) {
        return findAllWithFromId(from, pageable, UnaryOperator.identity());
    }

    @Override
    public Page<Post> findAllWithFromId(int from, int ownerId, Pageable pageable) {
        return findAllWithFromId(from, pageable, query -> query.where(post.owner.id.eq(ownerId)));
    }

    private Page<Post> findAllWithFromId(int from, Pageable pageable,
                                         UnaryOperator<SpringDataMongodbQuery<Post>> operator) {
        final SpringDataMongodbQuery<Post> query = operator.apply(new SpringDataMongodbQuery<>(mongoOperations, Post.class)
                .join(post.comments, comment)
                .on(comment.from.id.eq(from))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()));


        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }
}

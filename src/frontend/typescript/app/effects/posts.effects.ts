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

import {Injectable} from '@angular/core';
import {createEffect} from '@ngrx/effects';
import {PostsLoadedAction} from '../actions/posts.actions';
import {filter as filterOperator, map, switchMap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {getPostsRequest, State} from '../reducers';
import {PostsService} from '../services/posts.service';

@Injectable()
export class PostsEffects {

  loadPosts$ = createEffect(() => this.store$.pipe(
    select(getPostsRequest),
    filterOperator(({loading}) => loading),
    filterOperator(({filter: {from}}) => Boolean(from)),
    switchMap(({filter, page}) => this.postsService.getPosts(filter, page)),
    map(posts => new PostsLoadedAction(posts))
  ));

  constructor(private postsService: PostsService, private store$: Store<State>) {
  }
}

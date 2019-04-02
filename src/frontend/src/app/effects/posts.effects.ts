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

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {PostsActions, PostsActionTypes, PostsLoadedAction} from '../actions/posts.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {getPostsRequest, State} from '../reducers';
import {PostsService} from '../services/posts.service';


@Injectable()
export class PostsEffects {

  @Effect()
  loadPosts$ = this.actions$.pipe(
    ofType(PostsActionTypes.SearchFromChange, PostsActionTypes.SearchOwnerChange, PostsActionTypes.GetNextPage),
    withLatestFrom(this.store$.pipe(select(getPostsRequest))),
    switchMap(([, {filter, page}]) => this.postsService.getPosts(filter, page)),
    map(posts => new PostsLoadedAction(posts))
  );

  constructor(private actions$: Actions<PostsActions>, private postsService: PostsService, private store$: Store<State>) {
  }
}

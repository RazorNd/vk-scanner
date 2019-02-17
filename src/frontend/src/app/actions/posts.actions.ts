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

import {Action} from '@ngrx/store';
import {Filter} from '../services/posts.service';
import {Post} from '../models/post';

export enum PostsActionTypes {
  Search = '[PostsAction] Search Posts',
  PostsLoaded = '[PostsAction] Posts Loaded',
  GetNextPage = '[PostsAction] Get Next Page'
}

export class SearchPostsAction implements Action {
  readonly type = PostsActionTypes.Search;

  constructor(readonly payload: Filter) {
  }
}

export class PostsLoadedAction implements Action {
  readonly type = PostsActionTypes.PostsLoaded;

  constructor(readonly payload: Post[]) {
  }
}

export class GetNextPageAction implements Action {
  readonly type = PostsActionTypes.GetNextPage;
}

export type PostsActions = SearchPostsAction | PostsLoadedAction | GetNextPageAction;

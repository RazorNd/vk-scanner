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

import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromPosts from './posts.reducer';
import * as fromFilter from './filter.reducer';

export interface State {
  posts: fromPosts.State;
  filter: fromFilter.State;
}

export const reducers: ActionReducerMap<State> = {
  posts: fromPosts.reducer,
  filter: fromFilter.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getPostsState = (state: State) => state.posts;

export const getLoadedPosts = createSelector(
  getPostsState,
  fromPosts.getPosts
);

export const getPostsPage = createSelector(
  getPostsState,
  fromPosts.getPage
);

export const getPostsRequest = createSelector(
  getPostsState,
  fromPosts.getPostsRequest
);

export const getFilterState = (state: State) => state.filter;

export const getFilterFromOptions = createSelector(getFilterState, fromFilter.getFromOptions);

export const getFilterOwnerOptions = createSelector(getFilterState, fromFilter.getOwnerOptions);

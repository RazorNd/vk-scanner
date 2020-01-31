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

import {Post} from '../models/post';
import {PostsActions, PostsActionTypes} from '../actions/posts.actions';
import {Filter} from '../services/posts.service';

export interface PostsRequest {
  page: number;
  filter: Filter;
  loading: boolean;
}

export interface State extends PostsRequest {
  posts: Post[];
}

export const initialState: State = {
  posts: [],
  page: 0,
  loading: false,
  filter: {
    owner: null,
    from: null
  }
};

export function reducer(state = initialState, action: PostsActions): State {
  switch (action.type) {
    case PostsActionTypes.SearchChange:
      return {
        ...initialState,
        loading: Boolean(action.payload.owner || action.payload.from),
        filter: {
          ...action.payload
        }
      };
    case PostsActionTypes.PostsLoaded:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload]
      };
    case PostsActionTypes.GetNextPage:
      return {
        ...state,
        page: state.page + 1
      };
    default:
      return state;
  }
}

export const getPosts = (state: State) => state.posts;

export const getPage = (state: State) => state.page;

export const getPostsRequest = ({filter, page, loading}: State): PostsRequest => ({filter, page, loading});

export const getFilter = (state: State) => state.filter;

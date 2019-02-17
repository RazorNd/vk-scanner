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

import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Filter} from '../../services/posts.service';
import {GetNextPageAction, SearchPostsAction} from '../../actions/posts.actions';
import {Observable} from 'rxjs';
import {Post} from '../../models/post';
import {getLoadedPosts, State} from '../../reducers';
import {USERS} from '../../stubs/users.stub';

@Component({
  selector: 'sc-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.scss']
})
export class PostsSearchComponent {

  posts$: Observable<Post[]>;

  users = USERS.map(u => u.name);

  constructor(private store: Store<State>) {
    this.posts$ = store.pipe(select(getLoadedPosts));
  }

  dispatchSearch(filter: Filter) {
    this.store.dispatch(new SearchPostsAction(filter));
  }

  dispatchNextPage() {
    this.store.dispatch(new GetNextPageAction());
  }
}

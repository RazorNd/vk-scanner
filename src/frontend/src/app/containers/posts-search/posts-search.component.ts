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
import {GetNextPageAction, SearchFromChangeAction, SearchOwnerChangeAction} from '../../actions/posts.actions';
import {getFilterFromOptions, getFilterOwnerOptions, getLoadedPosts, State} from '../../reducers';

@Component({
  selector: 'sc-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.scss']
})
export class PostsSearchComponent {

  posts$ = this.store.pipe(select(getLoadedPosts));

  fromOptions$ = this.store.pipe(select(getFilterFromOptions));

  ownerOptions$ = this.store.pipe(select(getFilterOwnerOptions));

  constructor(private store: Store<State>) {
  }

  dispatchFromChange(from: number) {
    this.store.dispatch(new SearchFromChangeAction(from));
  }

  dispatchOwnerChange(owner: number) {
    this.store.dispatch(new SearchOwnerChangeAction(owner));
  }

  dispatchFilterFromChange(from: string) {
    console.log(from);
  }

  dispatchFilterOwnerChange(owner: string) {
    console.log(owner);
  }

  dispatchNextPage() {
    this.store.dispatch(new GetNextPageAction());
  }
}

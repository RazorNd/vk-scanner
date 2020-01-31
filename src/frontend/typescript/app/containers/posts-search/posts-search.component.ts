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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {GetNextPageAction, SearchChangeAction} from '../../actions/posts.actions';
import {getFilterFromOptions, getFilterOwnerOptions, getLoadedPosts, getPostsFilter, State} from '../../reducers';
import {FilterChanged} from '../../actions/filter.actions';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sc-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.scss']
})
export class PostsSearchComponent implements OnInit, OnDestroy {

  posts$ = this.store.pipe(select(getLoadedPosts));

  postsFilter$ = this.store.pipe(select(getPostsFilter));

  fromOptions$ = this.store.pipe(select(getFilterFromOptions));

  ownerOptions$ = this.store.pipe(select(getFilterOwnerOptions));

  private subscription: Subscription;

  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {
    this.subscription = this.route.queryParams.pipe(
      map(queryParams => ({from: +queryParams.f || null, owner: +queryParams.o || null})),
      map(payload => new SearchChangeAction(payload))
    ).subscribe(action => this.store.dispatch(action));
  }

  ngOnInit(): void {
    console.log('PostsSearchComponent Init');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('PostsSearchComponent Destroy');
  }

  fromChange(from: number) {
    return this.router.navigate([], {
      queryParams: {f: from}
    });
  }

  ownerChange(owner: number) {
    return this.router.navigate([], {
      queryParams: {o: owner}
    });
  }

  dispatchFilterFromChange(from: string) {
    this.store.dispatch(new FilterChanged(from, 'fromOptions'));
  }

  dispatchFilterOwnerChange(owner: string) {
    this.store.dispatch(new FilterChanged(owner, 'ownerOptions'));
  }

  dispatchNextPage() {
    this.store.dispatch(new GetNextPageAction());
  }
}

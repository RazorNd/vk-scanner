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
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {POSTS} from '../stubs/posts.stub';
import {of} from 'rxjs/internal/observable/of';
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


export interface Filter {
  from: number;
  owner: number;
}

export abstract class PostsService {
  abstract getPosts(filter: Filter, page: number): Observable<Post[]>;
}

@Injectable()
export class BackendPostsService extends PostsService {

  constructor(private http: HttpClient) {
    super();
  }

  getPosts(filter: Filter, page: number): Observable<Post[]> {
    return undefined;
  }
}

@Injectable()
export class MockPostsService extends PostsService {
  getPosts(filter: Filter, page: number): Observable<Post[]> {
    if (page > 10) {
      return of([]).pipe(delay(1300));
    }
    return of(POSTS).pipe(delay(700));
  }
}

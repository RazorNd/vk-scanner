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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {POSTS} from '../stubs/posts.stub';
import {of} from 'rxjs/internal/observable/of';
import {delay, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BackendPagedResponse} from "../models/backend-paged-response";


export interface Filter {
  from?: number;
  owner?: number;
}

export abstract class PostsService {
  abstract getPosts(filter: Filter, page?: number): Observable<Post[]>;

  abstract count(): Observable<number>;
}


@Injectable()
export class BackendPostsService extends PostsService {
  private static readonly URL = '/api/posts';
  private static readonly FROM = 'f';
  private static readonly OWNER = 'o';

  constructor(private http: HttpClient) {
    super();
  }

  getPosts(filter: Filter, page: number = 0): Observable<Post[]> {
    return this.http.get<BackendPagedResponse<Post>>(BackendPostsService.URL, {
      params: this.createParams(filter, page)
    }).pipe(
      map(dto => dto.content)
    );
  }

  protected createParams(filter: Filter, page: number) {
    let httpParams = new HttpParams();

    if (filter.from) {
      httpParams = httpParams.set(BackendPostsService.FROM, filter.from.toString());
    }
    if (filter.owner) {
      httpParams = httpParams.set(BackendPostsService.OWNER, filter.owner.toString());
    }
    if ((page > 0)) {
      httpParams = httpParams.set('page', page.toString());
    }

    return httpParams;
  }

  count(): Observable<number> {
    return this.http.get<number>(BackendPostsService.URL + '/count');
  }
}

@Injectable()
export class MockPostsService extends PostsService {
  getPosts(filter: Filter, page: number = 0): Observable<Post[]> {
    if (page > 10) {
      return of([]).pipe(delay(1300));
    }
    return of(POSTS).pipe(delay(700));
  }

  count(): Observable<number> {
    return of(POSTS.length);
  }
}

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

import {BackendPostsService, MockPostsService, PostsService} from './posts.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {POSTS} from '../stubs/posts.stub';
import {createBackendPagedResponse} from '../models/backend-paged-response';
import {Observable} from 'rxjs';
import {HttpRequest} from '@angular/common/http';
import {isArrayLike} from 'rxjs/internal-compatibility';

type RequestCreator<T> = (service: PostsService) => Observable<T>;

type RequestMatcher = (req: HttpRequest<any>) => boolean;

type RequestChecker = (req: HttpRequest<any>) => void;

type ResponseCreator<T> = (response: T) => any;

type ResponseChecker<T> = (response: jasmine.Matchers<T>, expected: T) => void;

interface BackendTestOptionalParams<T> {
  requestMatcher: RequestMatcher;
  requestChecker?: RequestChecker;
  responseChecker?: ResponseChecker<T>;
  responseCreator?: ResponseCreator<T>;
}

const defaultResponseChecker: ResponseChecker<any> = (response, expected) => {
  return isArrayLike(expected) ? response.toEqual(expected) : response.toBe(expected);
};

function commonTest<T>(request: RequestCreator<T>,
                       expected: T,
                       responseChecker: ResponseChecker<T> = defaultResponseChecker,
                       afterCommonTest: () => void = () => {
                       }): ImplementationCallback {
  return done => {
    request(TestBed.get(PostsService)).subscribe(result => responseChecker(expect(result), expected), fail, done);
    afterCommonTest();
  };
}

function backendTest<T>(request: RequestCreator<T>,
                        expected: T,
                        {
                          requestMatcher,
                          requestChecker,
                          responseChecker = defaultResponseChecker,
                          responseCreator = r => r
                        }: BackendTestOptionalParams<T>): ImplementationCallback {
  return commonTest(request, expected, responseChecker, () => {
    const testingController: HttpTestingController = TestBed.get(HttpTestingController);

    const testRequest = testingController.expectOne(requestMatcher);

    if (requestChecker) {
      requestChecker(testRequest.request);
    }

    testRequest.flush(responseCreator(expected));

    testingController.verify();
  });
}

describe('PostsService', () => {

  describe('BackendPostsService', () => {

    beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: PostsService, useClass: BackendPostsService}]
    }));

    it('should return posts from backend', backendTest(
      service => service.getPosts({from: 42}, 3),
      POSTS,
      {
        requestMatcher: req => req.method === 'GET' && req.url === '/api/posts',
        requestChecker: ({params}) => {
          expect(params.keys()).toEqual(['f', 'page']);
          expect(params.get('f')).toBe('42');
          expect(params.get('page')).toBe('3');
        },
        responseCreator: createBackendPagedResponse
      }
    ));

    it('should return posts count from backend', backendTest(
      service => service.count(),
      42,
      {requestMatcher: req => req.method === 'GET' && req.url === '/api/posts/count'}
    ));
  });

  describe('MockPostsService', () => {

    beforeEach(() => TestBed.configureTestingModule({
      providers: [{provide: PostsService, useClass: MockPostsService}]
    }));

    it('should return mock posts result', commonTest(
      service => service.getPosts({from: 1}, 1),
      POSTS
    ));

    it('should return mock posts count', commonTest(
      service => service.count(),
      POSTS.length
    ));

  });
});


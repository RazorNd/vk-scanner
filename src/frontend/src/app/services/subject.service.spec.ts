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

import {TestBed} from '@angular/core/testing';

import {BackendSubjectService, MockSubjectService, SubjectService} from './subject.service';
import {SubjectType} from "../models/subject-type";
import {USERS} from "../stubs/users.stub";
import {OWNERS} from "../stubs/owners.stub";
import {Owner} from "../models/owner";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {createBackendPagedResponse} from "../models/backend-paged-response";

function shouldBeCreated() {
  const service: SubjectService = TestBed.get(SubjectService);
  expect(service).toBeTruthy();
}

describe('SubjectService', () => {

  let service: SubjectService;

  function serviceShouldReturn(filter: string, subjectType: SubjectType, expected: Owner[]) {
    return (done) => {
      service.loadSubject(filter, subjectType)
        .subscribe(values => expect(values).toEqual(expected), fail, done);
    };
  }

  describe('MockSubjectService', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: SubjectService, useValue: new MockSubjectService()}
        ]
      });
      service = TestBed.get(SubjectService);
    });

    it('should be created', shouldBeCreated);

    it('should return all test data', serviceShouldReturn('', SubjectType.all, [...USERS, ...OWNERS]));

    it('should return only users', serviceShouldReturn('Иван', SubjectType.user, [USERS[0]]));

    it('should return only owners', serviceShouldReturn('Group', SubjectType.group, OWNERS));
  });

  describe('BackendSubjectService', () => {
    let testingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: SubjectService, useClass: BackendSubjectService}
        ]
      });
      testingController = TestBed.get(HttpTestingController);
      service = TestBed.get(SubjectService);
    });

    it('should be created', shouldBeCreated);

    it('should return subjects from backend', (done) => {
      const expectedFilter = 'Filter';
      const expectedResult = [...USERS, ...OWNERS];

      service.loadSubject(expectedFilter, SubjectType.all)
        .subscribe(values => expect(values).toEqual(expectedResult), fail, done);

      const testRequest = testingController.expectOne(req => req.url.startsWith('/api/subjects') && req.method == 'GET');

      expect(testRequest.request.params.get('f')).toBe(expectedFilter);
      expect(testRequest.request.params.get('type')).toBe('all');

      testRequest.flush(createBackendPagedResponse(expectedResult));

      testingController.verify();
    });

    it('should return subjects count from backend', (done) => {
      const expected = 42;
      service.count()
        .subscribe(count => expect(count).toBe(expected), fail, done);

      const testRequest = testingController.expectOne('/api/subjects/count');

      testRequest.flush(expected);

      testingController.verify();
    });
  });

});

/*
 * Copyright 2020 Daniil <razornd> Razorenov
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
import {asyncScheduler, Observable, of, SchedulerLike} from 'rxjs';
import {Owner} from '../models/owner';
import {SubjectType} from '../models/subject-type';
import {USERS} from '../stubs/users.stub';
import {OWNERS} from '../stubs/owners.stub';
import {delay, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BackendPagedResponse} from '../models/backend-paged-response';

export abstract class SubjectService {
  abstract loadSubject(filter: string, subjectType: SubjectType): Observable<Owner[]>;

  abstract count(): Observable<number>;
}

export class MockSubjectService extends SubjectService {

  scheduler: SchedulerLike = asyncScheduler;

  constructor(private delayMS: number = 700) {
    super();
  }

  loadSubject(filter: string, subjectType: SubjectType): Observable<Owner[]> {
    const result: Owner[] = [];

    if (subjectType === SubjectType.all || subjectType === SubjectType.user) {
      result.push(...USERS);
    }
    if (subjectType === SubjectType.all || subjectType === SubjectType.group) {
      result.push(...OWNERS);
    }

    return of(result.filter(subject => subject.name.includes(filter))).pipe(delay(this.delayMS, this.scheduler));
  }

  count(): Observable<number> {
    return of(USERS.length + OWNERS.length);
  }
}

@Injectable()
export class BackendSubjectService extends SubjectService {
  private static readonly TYPE = 'type';
  private static readonly FILTER = 'f';
  private static readonly URL = '/api/subjects';

  constructor(private http: HttpClient) {
    super();
  }

  loadSubject(filter: string, subjectType: SubjectType): Observable<Owner[]> {
    return this.http.get<BackendPagedResponse<Owner>>(BackendSubjectService.URL, {
      params: new HttpParams()
        .set(BackendSubjectService.FILTER, filter)
        .set(BackendSubjectService.TYPE, subjectType.toString())
    }).pipe(
      map(dto => dto.content)
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(BackendSubjectService.URL + '/count');
  }
}

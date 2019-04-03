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
import {asyncScheduler, Observable, of, SchedulerLike} from 'rxjs';
import {Owner} from '../models/owner';
import {SubjectType} from '../models/subject-type';
import {USERS} from '../stubs/users.stub';
import {OWNERS} from '../stubs/owners.stub';
import {delay} from 'rxjs/operators';

export abstract class SubjectService {
  abstract loadSubject(filter: string, subjectType: SubjectType): Observable<Owner[]>;
}

@Injectable()
export class MockSubjectService extends SubjectService {
  constructor(private delayMS: number = 700,
              private scheduler: SchedulerLike = asyncScheduler) {
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
}

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

import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {FilterEffects} from './filter.effects';
import {cold, getTestScheduler, hot} from 'jasmine-marbles';
import {MockSubjectService, SubjectService} from '../services/subject.service';
import {FilterChanged, OptionsLoaded} from '../actions/filter.actions';
import {USERS} from '../stubs/users.stub';
import {OWNERS} from '../stubs/owners.stub';

describe('FilterEffects', () => {
  const delay = 20;

  let actions$: Observable<any>;
  let effects: FilterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterEffects,
        provideMockActions(() => actions$),
        {
          provide: SubjectService, useFactory: () => {
            const service = new MockSubjectService(delay);
            service.scheduler = getTestScheduler();
            return service;
          }
        }
      ]
    });

    effects = TestBed.get(FilterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create OptionsLoaded, with owners, on success', () => {
    actions$ = hot('--a--b--', {
      a: new FilterChanged('Ива', 'fromOptions'),
      b: new FilterChanged('1', 'ownerOptions')
    });

    const expected$ = cold('----c--d', {
      c: new OptionsLoaded(USERS.filter(u => u.name.includes('Ива')), 'fromOptions'),
      d: new OptionsLoaded(OWNERS.filter(o => o.name.includes('1')), 'ownerOptions'),
    });

    expect(effects.loadOptions$).toBeObservable(expected$);
  });
});

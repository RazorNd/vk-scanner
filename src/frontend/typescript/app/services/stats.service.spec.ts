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

import {TestBed} from '@angular/core/testing';

import {StatsService} from './stats.service';
import {SubjectService} from './subject.service';
import {PostsService} from './posts.service';
import {CommentsService} from './comments.service';
import {cold, getTestScheduler} from 'jasmine-marbles';
import {Stats} from '../models/stats';
import {TestScheduler} from 'rxjs/testing';

describe('StatsService', () => {

  const subjectService = jasmine.createSpyObj('SubjectService', ['count']);
  const postsService = jasmine.createSpyObj('PostsService', ['count']);
  const commentsService = jasmine.createSpyObj('CommentsService', ['count']);

  let service: StatsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        StatsService,
        {provide: SubjectService, useValue: subjectService},
        {provide: PostsService, useValue: postsService},
        {provide: CommentsService, useValue: commentsService},
        // {provide: scheduler, useValue: getTestScheduler()}
      ]
    });
    service = TestBed.inject(StatsService);
    service.scheduler = getTestScheduler();
    [subjectService.count, postsService.count, commentsService.count].forEach(f => f.calls.reset());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function mockResults({subjectCount, postsCount, commentsCount}: Stats) {
    subjectService.count.and.returnValue(cold('--(a|)', {
      a: subjectCount
    }));
    postsService.count.and.returnValue(cold('----(a|)', {
      a: postsCount
    }));
    commentsService.count.and.returnValue(cold('---(a|)', {
      a: commentsCount
    }));
  }

  it('should return stats', () => {
    const stats = {
      subjectCount: 3,
      postsCount: 10,
      commentsCount: 200
    };
    mockResults(stats);

    expect(service.getStat()).toBeObservable(cold('----(r|)', {
      r: stats
    }));

    expect(subjectService.count.calls.count()).toBe(1);
    expect(postsService.count.calls.count()).toBe(1);
    expect(commentsService.count.calls.count()).toBe(1);
  });

  it('should return stats in interval', () => {
    const stats = {
      subjectCount: 3,
      postsCount: 10,
      commentsCount: 200
    };
    mockResults(stats);
    const testScheduler: TestScheduler = service.scheduler as TestScheduler;

    testScheduler.maxFrames = 3100;

    expect(service.getStatInterval(1000)).toBeObservable(cold('----r 990ms r 990ms r 990ms r', {
      r: stats
    }));

    expect(subjectService.count.calls.count()).toBe(5);
    expect(postsService.count.calls.count()).toBe(5);
    expect(commentsService.count.calls.count()).toBe(5);
  });
});

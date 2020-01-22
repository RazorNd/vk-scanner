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

import {StatsService} from './stats.service';
import {SubjectService} from './subject.service';
import {PostsService} from './posts.service';
import {CommentsService} from './comments.service';
import {cold, getTestScheduler} from 'jasmine-marbles';
import {Stats} from '../models/stats';
import {TestScheduler} from 'rxjs/testing';

describe('StatsService', () => {

  let subjectService: jasmine.SpyObj<SubjectService>;
  let postsService: jasmine.SpyObj<PostsService>;
  let commentsService: jasmine.SpyObj<CommentsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsService,
        {provide: SubjectService, useValue: jasmine.createSpyObj('SubjectService', ['count'])},
        {provide: PostsService, useValue: jasmine.createSpyObj('PostsService', ['count'])},
        {provide: CommentsService, useValue: jasmine.createSpyObj('CommentsService', ['count'])},
        // {provide: scheduler, useValue: getTestScheduler()}
      ]
    });

    subjectService = TestBed.get(SubjectService);
    postsService = TestBed.get(PostsService);
    commentsService = TestBed.get(CommentsService);
    TestBed.get(StatsService).scheduler = getTestScheduler();
  });

  it('should be created', () => {
    const service: StatsService = TestBed.get(StatsService);
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
    const service: StatsService = TestBed.get(StatsService);

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
    const service: StatsService = TestBed.get(StatsService);
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

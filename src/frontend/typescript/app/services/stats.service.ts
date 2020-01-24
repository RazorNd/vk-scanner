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
import {SubjectService} from './subject.service';
import {PostsService} from './posts.service';
import {CommentsService} from './comments.service';
import {asyncScheduler, combineLatest, interval, Observable, SchedulerLike} from 'rxjs';
import {Stats} from '../models/stats';
import {flatMap, map, startWith} from 'rxjs/operators';

@Injectable()
export class StatsService {

  public scheduler: SchedulerLike = asyncScheduler;

  constructor(private readonly subjectService: SubjectService,
              private readonly postsService: PostsService,
              private readonly commentsService: CommentsService) {
  }

  getStat(): Observable<Stats> {
    return combineLatest([
      this.subjectService.count(),
      this.postsService.count(),
      this.commentsService.count()
    ]).pipe(
      map(([subjectCount, postsCount, commentsCount]) => ({
        subjectCount,
        postsCount,
        commentsCount
      }))
    );
  }

  getStatInterval(period: number): Observable<Stats> {
    return interval(period, this.scheduler).pipe(
      startWith(this.getStat()),
      flatMap(_ => this.getStat())
    );
  }
}

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
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FilterActions, FilterActionTypes, OptionsLoaded, OptionsLoadedFailed} from '../actions/filter.actions';
import {SubjectService} from '../services/subject.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {SubjectType} from '../models/subject-type';
import {of} from 'rxjs';


@Injectable()
export class FilterEffects {

  @Effect()
  loadOptions$ = this.actions$.pipe(
    ofType(FilterActionTypes.FilterChanged),
    switchMap(action => this.subjectService.loadSubject(action.filter, SubjectType.all).pipe(
      map(subjects => new OptionsLoaded(subjects, action.optionsType)),
      catchError((err) => of(new OptionsLoadedFailed(err, action.optionsType)))
    ))
  );

  constructor(private actions$: Actions<FilterActions>,
              private subjectService: SubjectService) {
  }

}

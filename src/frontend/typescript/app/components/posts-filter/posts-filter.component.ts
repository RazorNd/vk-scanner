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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {asyncScheduler, Observable, OperatorFunction} from 'rxjs';
import {Owner} from '../../models/owner';

function selectChanges(property: string, dueTime = 500): OperatorFunction<any, string> {
  return function selectChangesOperator(source$: Observable<any>): Observable<string> {
    return source$.pipe(
      map(value => value[property] as string),
      filter(s => Boolean(s)),
      distinctUntilChanged(),
      debounceTime(dueTime, asyncScheduler)
    );
  };
}

@Component({
  selector: 'sc-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {
  form = new FormGroup({
    from: new FormControl(),
    owner: new FormControl(),
  });

  @Input() fromOptions: Owner[] = [];

  @Input() ownerOptions: Owner[] = [];

  @Input() fromValue: string;

  @Input() ownerValue: string;

  @Output() filterFromChanged: Observable<string> = this.form.valueChanges.pipe(selectChanges('from'));

  @Output() filterOwnerChanged: Observable<string> = this.form.valueChanges.pipe(selectChanges('owner'));

  @Output() fromSelected: EventEmitter<number> = new EventEmitter();

  @Output() ownerSelected: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.form.patchValue({
      from: this.fromValue,
      owner: this.ownerValue
    });
  }
}

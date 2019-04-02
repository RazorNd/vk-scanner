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

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {asyncScheduler, Observable} from 'rxjs';
import {Owner} from '../../models/owner';

@Component({
  selector: 'sc-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent {
  form = new FormGroup({
    from: new FormControl(),
    owner: new FormControl(),
  });

  @Input() fromOptions: Owner[] = [];

  @Input() ownerOptions: Owner[] = [];

  @Output() filterFromChanged: Observable<string> = this.form.valueChanges.pipe(
    map(value => value.from as string),
    debounceTime(500, asyncScheduler)
  );

  @Output() filterOwnerChanged: Observable<string> = this.form.valueChanges.pipe(
    map(value => value.owner as string),
    debounceTime(500, asyncScheduler)
  );

  @Output() fromSelected: EventEmitter<number> = new EventEmitter();

  @Output() ownerSelected: EventEmitter<number> = new EventEmitter();
}

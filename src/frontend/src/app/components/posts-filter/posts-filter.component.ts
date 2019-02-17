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

import {Component, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {asyncScheduler, Observable} from 'rxjs';
import {Filter} from '../../services/posts.service';

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

  @Input() values: string[];

  @Output() search: Observable<Filter> = this.form.valueChanges.pipe(
    debounceTime(500, asyncScheduler)
  );

  fromAutoComplete$ = this.getPreFilteredValues('from');
  ownerAutoComplete$ = this.getPreFilteredValues('owner');

  getPreFilteredValues(key: keyof Filter): Observable<string[]> {
    return this.form.valueChanges.pipe(
      map(filter => filter[key] as string),
      map(value => this.filterValues(value))
    );
  }

  filterValues(input?: string): string[] {
    if (!input) {
      return [];
    }
    const searchString = input.toLowerCase();
    return this.values ? this.values.filter(value => value.toLowerCase().includes(searchString)) : [];
  }
}

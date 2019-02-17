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
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Filter {
  from: string;
  owner: string;
}

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

  @Output() search: Observable<Filter> = this.form.valueChanges;

  fromAutoComplete$ = this.getPreFilteredValues('from');
  ownerAutoComplete$ = this.getPreFilteredValues('owner');

  getPreFilteredValues(key: keyof Filter): Observable<string[]> {
    return this.form.valueChanges.pipe(
      startWith({from: '', owner: ''}),
      map(filter => filter[key] as string),
      map(value => this.filterValues(value))
    );
  }

  filterValues(input: string): string[] {
    const searchString = input.toLowerCase();
    return this.values == null ? [] : this.values.filter(value => value.toLowerCase().includes(searchString));
  }
}

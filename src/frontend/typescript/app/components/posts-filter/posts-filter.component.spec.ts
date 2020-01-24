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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostsFilterComponent} from './posts-filter.component';
import {ComponentModule} from '../index';
import {USERS} from '../../stubs/users.stub';
import {OWNERS} from '../../stubs/owners.stub';

describe('PostsFilterComponent', () => {
  let component: PostsFilterComponent;
  let fixture: ComponentFixture<PostsFilterComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFilterComponent);
    component = fixture.componentInstance;
    component.fromOptions = USERS;
    component.ownerOptions = OWNERS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: more tests
});

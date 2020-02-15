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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentsListComponent} from './comments-list.component';
import {ComponentModule} from '../index';
import {By} from '@angular/platform-browser';
import {COMMENTS} from '../../stubs/comments.stub';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;
    component.comments = COMMENTS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 item in list', () => {
    const elements = fixture.debugElement.queryAll(By.css('.sc-comment'));
    expect(elements.length).toEqual(2);
  });

  it('should have information about user', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.innerText).toContain('Иванов Иван');
    expect(element.innerText).toContain('Василий Петров');
  });

  it('should have comment text', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.innerText).toContain('Первый нах!');
    expect(element.innerText).toContain('Ну чо пасаны,цифровое сопротивление');
  });
});

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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {Sex} from '../../models/user';
import {Post} from '../../models/post';
import {ComponentModule} from '../index';
import {By} from '@angular/platform-browser';

const post: Post = {
  id: {ownerId: 1, postId: 12},
  dateTime: new Date('2019-02-13T20:56:48.987Z'),
  from: {
    id: 1,
    name: 'Иванов Иван',
    firstName: 'Иван',
    lastName: 'Иванов',
    sex: Sex.MALE
  },
  owner: {
    id: -1,
    name: 'Главная группа!',
    icon: 'https://sun1-9.userapi.com/c846220/v846220796/1723ea/e3X-TUhHOEs.jpg?ava=1'
  },
  text: 'Тестовый пост'
};

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title from post', () => {
    const postOwnerElement = fixture.debugElement.query(By.css('.post-owner'));
    const nativeElement: HTMLElement = postOwnerElement.nativeElement;

    expect(nativeElement.textContent).toEqual(post.owner.name);
  });

  it('should have text from post', () => {
    const postText = fixture.debugElement.query(By.css('.post-text'));
    const nativeElement: HTMLElement = postText.nativeElement;

    expect(nativeElement.textContent).toContain(post.text);
  });

  it('should have date from post', () => {
    const postDate = fixture.debugElement.query(By.css('.post-date'));
    const nativeElement: HTMLElement = postDate.nativeElement;

    const date = post.dateTime;
    expect(nativeElement.textContent).toContain(date.getDate().toString(), 'wrong date component');
    expect(nativeElement.textContent).toContain(date.getFullYear().toString(), 'wrong year component');
  });
});

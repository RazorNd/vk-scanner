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
import {ComponentModule} from '../index';
import {By} from '@angular/platform-browser';
import {POSTS} from '../../stubs/posts.stub';

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
    component.post = POSTS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title from post', () => {
    const postOwnerElement = fixture.debugElement.query(By.css('.post-owner'));
    const nativeElement: HTMLElement = postOwnerElement.nativeElement;

    expect(nativeElement.textContent).toEqual(POSTS[0].owner.name);
  });

  it('should have text from post', () => {
    const postText = fixture.debugElement.query(By.css('.post-text'));
    const nativeElement: HTMLElement = postText.nativeElement;

    expect(nativeElement.textContent).toContain(POSTS[0].text);
  });

  it('should have date from post', () => {
    const postDate = fixture.debugElement.query(By.css('.post-date'));
    const nativeElement: HTMLElement = postDate.nativeElement;

    const date = POSTS[0].dateTime;
    expect(nativeElement.textContent).toContain(date.getDate().toString(), 'wrong date component');
    expect(nativeElement.textContent).toContain(date.getFullYear().toString(), 'wrong year component');
  });
});

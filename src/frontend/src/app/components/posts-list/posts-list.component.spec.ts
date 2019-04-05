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

import {PostsListComponent} from './posts-list.component';
import {ComponentModule} from '../index';
import {POSTS} from '../../stubs/posts.stub';
import {By} from '@angular/platform-browser';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    component.posts = POSTS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains all posts', () => {
    const postsElements = fixture.debugElement.queryAll(By.css('sc-post'));
    expect(postsElements.length).toEqual(POSTS.length);
    const nativeElement = fixture.nativeElement as HTMLElement;

    for (const post of POSTS) {
      expect(nativeElement.textContent).toContain(post.text);
    }
  });
});

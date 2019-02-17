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

import {NgModule} from '@angular/core';
import {RootComponent} from './root/root.component';
import {PostComponent} from './post/post.component';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatCardModule, MatInputModule, MatListModule} from '@angular/material';
import {CommentsListComponent} from './comment/comments-list.component';
import {PipesModule} from '../pipes/pipes.module';
import {PostsListComponent} from './posts-list/posts-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {PostsFilterComponent} from './posts-filter/posts-filter.component';

export const COMPONENTS = [
  RootComponent,
  PostComponent,
  PostsListComponent,
  PostsFilterComponent,
  CommentsListComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatAutocompleteModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentModule {
}

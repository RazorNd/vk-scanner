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

import {NgModule} from '@angular/core';
import {PostComponent} from './post/post.component';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {CommentsListComponent} from './comment/comments-list.component';
import {PipesModule} from '../pipes/pipes.module';
import {PostsListComponent} from './posts-list/posts-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {PostsFilterComponent} from './posts-filter/posts-filter.component';
import {DashboardCardComponent} from './dashboard-card/dashboard-card.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SpeedometerComponent} from './speedometer/speedometer.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {StartScanningFormComponent} from './start-scanning-form/start-scanning-form.component';

export const COMPONENTS = [
  DashboardCardComponent,
  PostComponent,
  PostsListComponent,
  PostsFilterComponent,
  CommentsListComponent,
  SpeedometerComponent,
  StartScanningFormComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule,
    PipesModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSelectModule,
    MatRadioModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentModule {
}

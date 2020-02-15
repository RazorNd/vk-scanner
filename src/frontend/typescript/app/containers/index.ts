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
import {PostsSearchComponent} from './posts-search/posts-search.component';
import {ComponentModule} from '../components';
import {CommonModule} from '@angular/common';
import {RootComponent} from './root/root.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {AppRoutingModule} from '../app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ScanSpeedComponent} from './scan-speed/scan-speed.component';
import {StartScanningComponent} from './start-scanning/start-scanning.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {StatsComponent} from './stats/stats.component';
import {ChartsModule} from 'ng2-charts';

export const COMPONENTS = [
  DashboardComponent,
  RootComponent,
  PostsSearchComponent,
  ScanSpeedComponent,
  StatsComponent,
  StartScanningComponent
];

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ComponentModule,
    CommonModule,
    AppRoutingModule,
    ChartsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ContainersModule {
}

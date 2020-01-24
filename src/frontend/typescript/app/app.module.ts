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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RootComponent} from './containers/root/root.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {PostsEffects} from './effects/posts.effects';
import {ContainersModule} from './containers';
import {FilterEffects} from './effects/filter.effects';
import {ServiceModule} from './services';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './rx-stomp.config';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ContainersModule,
    ServiceModule,
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([PostsEffects, FilterEffects])
  ],
  bootstrap: [RootComponent],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ]
})
export class AppModule {
}

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

import {Action} from '@ngrx/store';
import {Owner} from '../models/owner';

export enum FilterActionTypes {
  FilterChanged = '[Filter] Filter value changed',
  OptionsLoaded = '[Filter] Options loaded',
  OptionsLoadFailed = '[Filter] Load options failed'
}

export type OptionsType = 'fromOptions' | 'ownerOptions';

export class FilterChanged {
  readonly type = FilterActionTypes.FilterChanged;

  constructor(readonly filter: string, readonly optionsType: OptionsType) {
  }
}

export class OptionsLoaded implements Action {
  readonly type = FilterActionTypes.OptionsLoaded;

  constructor(readonly options: Owner[], readonly optionsType: OptionsType) {
  }
}

export class OptionsLoadedFailed implements Action {
  readonly type = FilterActionTypes.OptionsLoadFailed;

  constructor(readonly err: any, readonly optionsType: OptionsType) {
  }
}


export type FilterActions = FilterChanged | OptionsLoaded | OptionsLoadedFailed;

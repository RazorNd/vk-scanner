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

import {FilterActions, FilterActionTypes} from '../actions/filter.actions';
import {Owner} from '../models/owner';


export interface State {
  load: {
    fromOptions: boolean;
    ownerOptions: boolean;
  };
  fromOptions: Owner[];
  ownerOptions: Owner[];
}

export const initialState: State = {
  load: {
    fromOptions: false,
    ownerOptions: false,
  },
  fromOptions: [],
  ownerOptions: []
};

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {
    case FilterActionTypes.FilterChanged:
      return {
        ...state,
        load: {
          ...state.load,
          [action.optionsType]: true
        }
      };
    case FilterActionTypes.OptionsLoaded:
      return {
        ...state,
        [action.optionsType]: action.options,
        load: {
          ...state.load,
          [action.optionsType]: false
        }
      };
    default:
      return state;
  }
}

export const getFromOptions = (state: State) => state.fromOptions;

export const getOwnerOptions = (state: State) => state.ownerOptions;

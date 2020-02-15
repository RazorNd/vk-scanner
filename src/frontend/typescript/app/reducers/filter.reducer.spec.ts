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

import {initialState, reducer, State} from './filter.reducer';
import {FilterChanged, OptionsLoaded, OptionsLoadedFailed} from '../actions/filter.actions';
import {USERS} from '../stubs/users.stub';
import {OWNERS} from '../stubs/owners.stub';

describe('Filter Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('an filter actions', () => {

    it('should fill fromOptions', () => {
      const action = new OptionsLoaded(USERS, 'fromOptions');

      const state: State = {
        ...initialState,
        load: {
          ...initialState.load,
          fromOptions: true
        },
        fromOptions: USERS,
        ownerOptions: []
      };

      const result = reducer(state, action);

      expect(result).toEqual({
        ...initialState,
        fromOptions: USERS,
        ownerOptions: []
      });
    });

    it('should fill ownerOptions', () => {
      const action = new OptionsLoaded(OWNERS, 'ownerOptions');

      const state: State = {
        ...initialState,
        load: {
          ...initialState.load,
          fromOptions: true,
          ownerOptions: true
        },
        fromOptions: USERS,
        ownerOptions: USERS
      };

      const result = reducer(state, action);

      expect(result).toEqual({
        ...initialState,
        load: {
          ...initialState.load,
          fromOptions: true
        },
        fromOptions: USERS,
        ownerOptions: OWNERS
      });
    });

    it('should change to load state on FilterChanged', () => {
      const action = new FilterChanged('Иван', 'ownerOptions');

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        load: {
          ...initialState.load,
          ownerOptions: true
        }
      });
    });

    it('should change to not load state on OptionsLoadedFailed', () => {
      const action = new OptionsLoadedFailed('Потомучто', 'fromOptions');

      const state = {...initialState, load: {fromOptions: true, ownerOptions: true}};

      const result = reducer(state, action);

      expect(result).toEqual({...state, load: {fromOptions: false, ownerOptions: true}});
    });
  });
});

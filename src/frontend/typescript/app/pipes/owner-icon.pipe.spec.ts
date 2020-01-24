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

import {OwnerIconPipe} from './owner-icon.pipe';
import {USERS} from '../stubs/users.stub';

describe('OwnerIconPipe', () => {

  let pipe: OwnerIconPipe;

  beforeEach(() => {
    pipe = new OwnerIconPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('owner with icon', () => {
    const user = USERS[0];
    const icon = pipe.transform(user);
    expect(icon).toEqual(user.icon);
  });

  it('group anonymous icon', () => {
    const icon = pipe.transform({
      id: -1,
      name: 'test group'
    });
    expect(icon).toEqual('/assets/icons/anonymous.group.png');
  });

  it('user anonymous icon', () => {
    const icon = pipe.transform({
      id: 1,
      name: 'Вася Пупкин'
    });
    expect(icon).toEqual('/assets/icons/anonymous.user.png');
  });
});

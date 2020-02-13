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

import {Sex, User} from '../models/user';

export const USERS: User[] = [
  {
    id: 1,
    name: 'Иванов Иван',
    firstName: 'Иван',
    lastName: 'Иванов',
    sex: Sex.MALE,
    icon: 'https://pp.userapi.com/c836333/v836333001/31193/dNxZpRF-z_M.jpg?ava=1'
  },
  {
    id: 2,
    name: 'Василий Петров',
    firstName: 'Василий',
    lastName: 'Петров',
    sex: Sex.MALE,
    icon: 'https://sun1-1.userapi.com/c7008/v7008306/75709/h6u4kDmDO5Y.jpg'
  }
];


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

import {Post} from '../models/post';
import {COMMENTS} from './comments.stub';
import {USERS} from './users.stub';

export const POSTS: Post[] = [
  {
    id: {ownerId: 1, postId: 12},
    dateTime: new Date('2019-02-13T20:56:48.987Z'),
    from: USERS[0],
    owner: {
      id: -1,
      name: 'Главная группа!',
      icon: 'https://sun1-9.userapi.com/c846220/v846220796/1723ea/e3X-TUhHOEs.jpg?ava=1'
    },
    text: 'Тестовый пост',
    comments: COMMENTS
  },
  {
    id: {ownerId: 1, postId: 13},
    dateTime: new Date('2019-02-13T20:56:48.987Z'),
    from: USERS[1],
    owner: {
      id: -2,
      name: 'Анонимная группа!'
    },
    text: 'Пост без комментариев'
  },
];

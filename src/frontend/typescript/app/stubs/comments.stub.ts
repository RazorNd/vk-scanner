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

import {Comment} from '../models/comment';
import {USERS} from './users.stub';

// noinspection SpellCheckingInspection
export const COMMENTS: Comment[] = [
  {
    id: {
      ownerId: -1,
      postId: 1,
      commentId: 1
    },
    dateTime: new Date('2019-02-14T15:36:48.987Z'),
    from: USERS[0],
    text: 'Первый нах!'
  },
  {
    id: {
      ownerId: -1,
      postId: 1,
      commentId: 1
    },
    dateTime: new Date('2019-02-14T16:12:00.987Z'),
    from: USERS[1],
    text: 'Ну чо пасаны,цифровое сопротивление\n' +
      'UPD:Го 1К лайков? :D\n' +
      'UPDD:Чувак сверху спиздил с сохраненки.крыса!!!'
  }
];

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

import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {environment} from '../environments/environment';

export const rxStompConfig: InjectableRxStompConfig = {
  brokerURL: `ws://${window.location.host}/ws/stomp`,
  debug: !environment.production ? msg => console.log(msg) : _ => {
  }
};

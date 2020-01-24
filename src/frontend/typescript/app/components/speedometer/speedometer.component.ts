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

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'sc-speedometer',
  template: `
      <ngx-gauge thick="12"
                 cap="round"
                 max="300"
                 duration="900"
                 append="/сек."
                 type="full"
                 [size]="size"
                 [label]="label"
                 [value]="value">
      </ngx-gauge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeedometerComponent {
  @Input() value: number;
  @Input() label: string;
  @Input() size = 300;
}

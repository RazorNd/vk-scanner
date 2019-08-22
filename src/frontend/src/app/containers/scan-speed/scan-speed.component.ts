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

import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ScanningEventType, ScanningService} from '../../services/scanning.service';

@Component({
  selector: 'sc-scan-speed',
  templateUrl: './scan-speed.component.html',
  styleUrls: ['./scan-speed.component.scss']
})
export class ScanSpeedComponent {

  postsPerSeconds$: Observable<number> = this.scanningService.scanSpeed(ScanningEventType.POST);
  commentsPerSeconds$: Observable<number> = this.scanningService.scanSpeed(ScanningEventType.COMMENT);

  constructor(private scanningService: ScanningService) {
  }
}

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

import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Observable} from 'rxjs';
import {bufferCount, count, flatMap, map, windowTime} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ScanningOptions} from '../models/scanning-options';

function average(numbers: number[]): number {
  return numbers.reduce((sum, current) => sum + current) / numbers.length;
}

export enum ScanningEventType {
  COMMENT = '/topic/comment-scanned',
  POST = '/topic/post-scanned'
}

@Injectable({
  providedIn: 'root'
})
export class ScanningService {
  constructor(private stompService: RxStompService,
              private httpClient: HttpClient) {
  }

  startScanning(scanningOption: ScanningOptions): Observable<boolean> {
    return this.httpClient.post('/api/scan', scanningOption, {observe: 'response'})
      .pipe(
        map(r => r.ok)
      );
  }

  private scanned(eventType: ScanningEventType): Observable<any> {
    return this.stompService.watch(eventType);
  }

  scanSpeed(eventType: ScanningEventType): Observable<number> {
    return this.scanned(eventType)
      .pipe(
        windowTime(1000),
        flatMap(count()),
        bufferCount(10, 1),
        map(average)
      );
  }
}

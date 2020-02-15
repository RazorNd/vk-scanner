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

import {TestBed} from '@angular/core/testing';

import {ScanningService} from './scanning.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ScanningService', () => {
  let testingController: HttpTestingController;
  let service: ScanningService;
  let stompService: jasmine.SpyObj<RxStompService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: RxStompService, useValue: jasmine.createSpyObj('RxStompService', ['watch'])},
      ]
    });

    testingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ScanningService);
    stompService = TestBed.get(RxStompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be send request to backend on start scanning', () => {
    service.startScanning({duration: 3, groupId: '32123'})
      .subscribe(r => expect(r).toBeTruthy(), fail);

    const request = testingController.expectOne('/api/scan');

    expect(request.request.method).toBe('POST');

    request.flush(null);
  });

  it('start scanning should return observable with error if backend send exception', () => {
    service.startScanning({duration: 3, groupId: '32123'})
      .subscribe(fail, error => expect(error).toBeTruthy());

    const testRequest = testingController.expectOne('/api/scan');
    testRequest.error(new ErrorEvent('Service Unavailable'), {status: 503});
  });
});

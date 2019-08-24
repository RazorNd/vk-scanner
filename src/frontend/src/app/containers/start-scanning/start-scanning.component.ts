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
import {ScanningOptions} from '../../models/scanning-options';
import {ScanningService} from '../../services/scanning.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'sc-start-scanning',
  template: `
      <sc-start-scanning-form (startScanning)="sendStartScanning($event)"></sc-start-scanning-form>
  `,
  styles: []
})
export class StartScanningComponent {
  private static readonly successMessage = 'Начато сканирование';
  private static readonly errorMessage = 'Ошибка сканирования';

  constructor(private scanningService: ScanningService,
              private snackBar: MatSnackBar) {
  }

  sendStartScanning(scanningOptions: ScanningOptions) {
    this.scanningService.startScanning(scanningOptions).pipe(
      map(success => success ? StartScanningComponent.successMessage : StartScanningComponent.errorMessage),
      catchError(_ => of(StartScanningComponent.errorMessage))
    ).subscribe(message => this.snackBar.open(message, 'Ок'));
  }
}

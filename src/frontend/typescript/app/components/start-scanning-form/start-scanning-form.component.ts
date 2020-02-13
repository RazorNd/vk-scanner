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

import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {ScanningOptions} from '../../models/scanning-options';

@Component({
  selector: 'sc-start-scanning-form',
  templateUrl: './start-scanning-form.component.html',
  styleUrls: ['./start-scanning-form.component.scss']
})
export class StartScanningFormComponent {
  startScanningForm = this.fb.group({
    groupId: [null, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])],
    duration: [3, Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.max(6)
    ])]
  });

  @ViewChild(FormGroupDirective, {static: true}) form: FormGroupDirective;

  @Output() startScanning = new EventEmitter<ScanningOptions>();

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    this.startScanning.emit(this.startScanningForm.value);
    this.startScanningForm.reset();
    this.form.resetForm();
  }

  hasError(formControlName: string, errorCode: string): boolean {
    return this.startScanningForm.hasError(errorCode, formControlName);
  }
}

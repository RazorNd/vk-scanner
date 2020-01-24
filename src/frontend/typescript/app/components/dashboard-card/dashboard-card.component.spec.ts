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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCardComponent} from './dashboard-card.component';
import {ComponentModule} from '../index';
import {By} from '@angular/platform-browser';

describe('DashboardCardComponent', () => {
  const title = 'test';

  let component: DashboardCardComponent;
  let fixture: ComponentFixture<DashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardComponent);
    component = fixture.componentInstance;
    component.title = title;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const element = fixture.debugElement.query(By.css('mat-card-title'));

    expect((element.nativeElement as HTMLElement).innerText).toContain(title);
  });

  it('should not have menu button if it does not contains menu items', () => {
    const element = fixture.debugElement.query(By.css('.more-button'));

    expect(element).toBeNull();
  });

  it('should have menu button if it contains menu items', () => {
    component.menuItems = ['1', '2', '3'];
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.more-button'));

    expect(element).not.toBeNull();
  });
});

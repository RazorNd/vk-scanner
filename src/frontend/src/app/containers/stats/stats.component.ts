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

import 'chartjs-plugin-datalabels';
import {Component} from '@angular/core';
import {StatsService} from '../../services/stats.service';
import {map, startWith} from 'rxjs/operators';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'sc-stats',
  template: `
      <div class="stat-container">
          <canvas baseChart
                  [data]="dataset$ | async"
                  chartType="doughnut"
                  [options]="options"
                  [labels]="['Субъекты', 'Посты', 'Комментарии']"></canvas>
      </div>
  `,
  styles: [`
      .stat-container {
      }
  `]
})
export class StatsComponent {

  dataset$ = this.service.getStatInterval(10000).pipe(
    startWith({
      subjectCount: 0,
      postsCount: 0,
      commentsCount: 0
    }),
    map(({commentsCount, postsCount, subjectCount}) => ([subjectCount, postsCount, commentsCount]))
  );
  options: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {}
    }
  };

  constructor(private readonly service: StatsService) {
  }
}

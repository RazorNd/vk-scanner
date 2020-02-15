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

import {SubjectReferencePipe} from './subject-reference.pipe';
import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';

describe('SubjectReferencePipe', () => {

  const sanitizer = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', ['bypassSecurityTrustHtml']);

  let pipe: SubjectReferencePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: DomSanitizer, useValue: sanitizer},
        SubjectReferencePipe
      ]
    });
    pipe = TestBed.get(SubjectReferencePipe);
    sanitizer.bypassSecurityTrustHtml.and.callFake(s => s)
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('correct transform', () => {
    [
      [' ', ' '],
      ['[id154323434|Andrey], рада за твоего Макса 😆', '<span class="test">Andrey</span>, рада за твоего Макса 😆'],
      [
        ' [id420202121|Александр], у меня норма в день - увести 5 "мужиков", только что вот 5-ого увела 😆 ',
        ' <span class="test">Александр</span>, у меня норма в день - увести 5 "мужиков", только что вот 5-ого увела 😆 '
      ],
      [
        ' [id155323434|Andrey] и [id420202121|Александр], рада за твоего Макса 😆',
        ' <span class="test">Andrey</span> и <span class="test">Александр</span>, рада за твоего Макса 😆'
      ],
      ['На шурпу, [id145213230|Ольга]?', 'На шурпу, <span class="test">Ольга</span>?'],
      [
        'жизнь сложная.\n[id162623634|Ольга], может и похвалился',
        'жизнь сложная.\n<span class="test">Ольга</span>, может и похвалился'
      ],
    ].forEach(([values, expected]) => expect(pipe.transform(values, 'test')).toBe(expected))
  });
});

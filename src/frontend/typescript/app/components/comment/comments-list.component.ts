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

import {Component, Input} from '@angular/core';
import {Comment} from '../../models/comment';

type CommentFilter = (comment: Comment, index: number) => boolean;

@Component({
  selector: 'sc-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent {

  showAll = false;

  @Input() comments: Comment[];

  @Input() commentFilterStrategy: CommentFilter = (comment, index) => index < 3;

  commentsToShow(): Comment[] {
    return this.comments
      .filter(this.commentFilter.bind(this))
      .sort(this.compareComment.bind(this));
  }

  commentFilter(comment: Comment, index: number): boolean {
    return this.showAll || this.commentFilterStrategy(comment, index);
  }

  compareComment(a: Comment, b: Comment) {
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
  }
}

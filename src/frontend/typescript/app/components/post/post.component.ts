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

import {Component, Input} from '@angular/core';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {Filter} from '../../services/posts.service';

@Component({
  selector: 'sc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;

  @Input() filter: Filter;

  commentFilterStrategy = (comment: Comment): boolean => !this.filter || comment.from.id === this.filter.from;

  get haveComments(): boolean {
    return this.post.comments && this.post.comments.length > 0;
  }
}

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentsListComponent} from './comments-list.component';
import {Comment} from '../../models/comment';
import {Sex} from '../../models/user';
import {ComponentModule} from '../index';
import {By} from '@angular/platform-browser';

const comments: Comment[] = [
  {
    id: {
      ownerId: -1,
      postId: 1,
      commentId: 1
    },
    dateTime: new Date('2019-02-14T15:36:48.987Z'),
    from: {
      id: 1,
      name: 'Иванов Иван',
      firstName: 'Иван',
      lastName: 'Иванов',
      sex: Sex.MALE,
      icon: 'https://pp.userapi.com/c836333/v836333001/31193/dNxZpRF-z_M.jpg?ava=1'
    },
    text: 'Первый нах!'
  },
  {
    id: {
      ownerId: -1,
      postId: 1,
      commentId: 1
    },
    dateTime: new Date('2019-02-14T16:12:00.987Z'),
    from: {
      id: 1,
      name: 'Василий Петров',
      firstName: 'Иван',
      lastName: 'Иванов',
      sex: Sex.MALE,
      icon: 'https://sun1-1.userapi.com/c7008/v7008306/75709/h6u4kDmDO5Y.jpg'
    },
    text: 'Ну чо пасаны,цифровое сопротивление\n' +
      'UPD:Го 1К лайков? :D\n' +
      'UPDD:Чувак сверху спиздил с сохраненки.крыса!!!'
  }
];

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;
    component.comments = comments;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 item in list', () => {
    const elements = fixture.debugElement.queryAll(By.css('.cs-comment'));
    expect(elements.length).toEqual(2);
  });

  it('should have information about user', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.innerText).toContain('Иванов Иван');
    expect(element.innerText).toContain('Василий Петров');
  });

  it('should have comment text', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.innerText).toContain('Первый нах!');
    expect(element.innerText).toContain('Ну чо пасаны,цифровое сопротивление');
  });
});

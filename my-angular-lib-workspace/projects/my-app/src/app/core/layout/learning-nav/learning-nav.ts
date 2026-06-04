import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LessonLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-learning-nav',
  imports: [RouterLink],
  templateUrl: './learning-nav.html',
  styleUrl: './learning-nav.css',
})
export class LearningNav {
  @Input({ required: true }) activeLesson!: number;

  protected readonly lessons: LessonLink[] = [
    { label: 'Lesson 1', path: '/ngrx-lessons/lesson-01-counter' },
    { label: 'Lesson 2', path: '/ngrx-lessons/lesson-02-todos' },
    { label: 'Lesson 3', path: '/ngrx-lessons/lesson-03-effects-products' },
    { label: 'Lesson 4', path: '/ngrx-lessons/lesson-04-entity-books' },
    { label: 'Lesson 5', path: '/ngrx-lessons/lesson-05-signal-store' },
    { label: 'Lesson 6', path: '/ngrx-lessons/lesson-06-route-param-store/project-101' },
    { label: 'Lesson 7', path: '/ngrx-lessons/lesson-07-rxmethod-search' },
    { label: 'Lesson 8', path: '/ngrx-lessons/lesson-08-optimistic-updates' },
    { label: 'Lesson 9', path: '/ngrx-lessons/lesson-09-pessimistic-updates' },
    { label: 'Lesson 10', path: '/ngrx-lessons/lesson-10-effect-concurrency' },
    { label: 'Lesson 11', path: '/ngrx-lessons/lesson-11-facade-pattern' },
    { label: 'Lesson 12', path: '/ngrx-lessons/lesson-12-router-store/route-params' },
    { label: 'Lesson 13', path: '/ngrx-lessons/lesson-13-subscriptions/route-params' },
    { label: 'Lesson 14', path: '/ngrx-lessons/lesson-14-route-effects/project-101' },
    { label: 'Lesson 15', path: '/ngrx-lessons/lesson-15-lazy-feature-state' },
    { label: 'Lesson 16', path: '/ngrx-lessons/lesson-16-view-model-selectors' },
    { label: 'Lesson 17', path: '/ngrx-lessons/lesson-17-action-state-effects' },
    { label: 'Lesson 18', path: '/ngrx-lessons/lesson-18-selector-factories' },
    { label: 'Lesson 19', path: '/ngrx-lessons/lesson-19-non-dispatching-effects' },
    { label: 'Lesson 20', path: '/ngrx-lessons/lesson-20-functional-effects' },
    { label: 'Lesson 21', path: '/ngrx-lessons/lesson-21-store-devtools' },
    { label: 'Lesson 22', path: '/ngrx-lessons/lesson-22-meta-reducers' },
  ];
}

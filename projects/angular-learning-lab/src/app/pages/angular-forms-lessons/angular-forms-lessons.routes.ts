import { Routes } from '@angular/router';

export const angularFormsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-reactive-form-basics',
    loadComponent: () =>
      import('./lesson-01-reactive-form-basics/lesson-01-reactive-form-basics').then(
        (m) => m.Lesson01ReactiveFormBasics,
      ),
  },
];

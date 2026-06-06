import { Routes } from '@angular/router';

export const rxjsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-observable-basics',
    loadComponent: () =>
      import('./lesson-01-observable-basics/lesson-01-observable-basics').then(
        (m) => m.Lesson01ObservableBasics,
      ),
  },
];


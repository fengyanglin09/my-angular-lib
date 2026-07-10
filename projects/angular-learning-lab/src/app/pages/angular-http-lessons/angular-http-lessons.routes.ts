import { Routes } from '@angular/router';

export const angularHttpLessonsRoutes: Routes = [
  {
    path: 'lesson-01-http-client-basics',
    loadComponent: () =>
      import('./lesson-01-http-client-basics/lesson-01-http-client-basics').then(
        (m) => m.Lesson01HttpClientBasics,
      ),
  },
];

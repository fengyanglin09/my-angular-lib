import { Routes } from '@angular/router';

export const angularHttpLessonsRoutes: Routes = [
  {
    path: 'lesson-01-http-client-basics',
    loadComponent: () =>
      import('./lesson-01-http-client-basics/lesson-01-http-client-basics').then(
        (m) => m.Lesson01HttpClientBasics,
      ),
  },
  {
    path: 'lesson-02-post-create',
    loadComponent: () =>
      import('./lesson-02-post-create/lesson-02-post-create').then(
        (m) => m.Lesson02PostCreate,
      ),
  },
  {
    path: 'lesson-03-json-server-backend',
    loadComponent: () =>
      import('./lesson-03-json-server-backend/lesson-03-json-server-backend').then(
        (m) => m.Lesson03JsonServerBackend,
      ),
  },
];

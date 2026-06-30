import { Routes } from '@angular/router';

export const angularRouteLessonsRoutes: Routes = [
  {
    path: 'lesson-01-route-basics',
    loadComponent: () =>
      import('./lesson-01-route-basics/lesson-01-route-basics').then(
        (m) => m.Lesson01RouteBasics,
      ),
  },
];

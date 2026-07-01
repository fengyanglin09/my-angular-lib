import { Routes } from '@angular/router';

export const angularRouteLessonsRoutes: Routes = [
  {
    path: 'lesson-01-route-basics',
    loadComponent: () =>
      import('./lesson-01-route-basics/lesson-01-route-basics').then(
        (m) => m.Lesson01RouteBasics,
      ),
  },
  {
    path: 'lesson-02-route-params',
    pathMatch: 'full',
    redirectTo: 'lesson-02-route-params/project-101',
  },
  {
    path: 'lesson-02-route-params/:projectId',
    loadComponent: () =>
      import('./lesson-02-route-params/lesson-02-route-params').then(
        (m) => m.Lesson02RouteParams,
      ),
  },
];

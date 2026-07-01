import { Routes } from '@angular/router';

import { Lesson04ChildRoutes } from './lesson-04-child-routes/lesson-04-child-routes';
import { ProjectActivity } from './lesson-04-child-routes/project-activity';
import { ProjectOverview } from './lesson-04-child-routes/project-overview';
import { ProjectSettings } from './lesson-04-child-routes/project-settings';

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
  {
    path: 'lesson-03-query-params',
    loadComponent: () =>
      import('./lesson-03-query-params/lesson-03-query-params').then(
        (m) => m.Lesson03QueryParams,
      ),
  },
  {
    path: 'lesson-04-child-routes',
    component: Lesson04ChildRoutes,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: ProjectOverview,
      },
      {
        path: 'activity',
        component: ProjectActivity,
      },
      {
        path: 'settings',
        component: ProjectSettings,
      },
    ],
  },
];

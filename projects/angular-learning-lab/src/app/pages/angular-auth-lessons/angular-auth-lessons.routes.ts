import { Routes } from '@angular/router';

export const angularAuthLessonsRoutes: Routes = [
  {
    path: 'lesson-01-login-flow',
    loadComponent: () =>
      import('./lesson-01-login-flow/lesson-01-login-flow').then(
        (m) => m.AuthLesson01LoginFlow
      ),
  },
  {
    path: 'lesson-02-route-guards',
    loadComponent: () =>
      import('./lesson-02-route-guards/lesson-02-route-guards').then(
        (m) => m.AuthLesson02RouteGuards
      ),
  },
  {
    path: 'lesson-03-token-session-handling',
    loadComponent: () =>
      import(
        './lesson-03-token-session-handling/lesson-03-token-session-handling'
      ).then((m) => m.AuthLesson03TokenSessionHandling),
  },
  {
    path: 'lesson-04-role-based-ui',
    loadComponent: () =>
      import('./lesson-04-role-based-ui/lesson-04-role-based-ui').then(
        (m) => m.AuthLesson04RoleBasedUi
      ),
  },
  {
    path: 'lesson-05-refresh-token-flow',
    loadComponent: () =>
      import(
        './lesson-05-refresh-token-flow/lesson-05-refresh-token-flow'
      ).then((m) => m.AuthLesson05RefreshTokenFlow),
  },
  {
    path: 'lesson-06-logout-cleanup',
    loadComponent: () =>
      import('./lesson-06-logout-cleanup/lesson-06-logout-cleanup').then(
        (m) => m.AuthLesson06LogoutCleanup
      ),
  },
];

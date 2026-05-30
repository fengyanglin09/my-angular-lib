import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ngrx-lessons/lesson-01-counter',
  },
  {
    path: 'ngrx-lessons/lesson-01-counter',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-01-counter/lesson-01-counter').then(
        (m) => m.Lesson01Counter,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-02-todos',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-02-todos/lesson-02-todos').then(
        (m) => m.Lesson02Todos,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-03-effects-products',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-03-effects-products/lesson-03-effects-products').then(
        (m) => m.Lesson03EffectsProducts,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-04-entity-books',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-04-entity-books/lesson-04-entity-books').then(
        (m) => m.Lesson04EntityBooks,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-05-signal-store',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-05-signal-store/lesson-05-signal-store').then(
        (m) => m.Lesson05SignalStore,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-06-route-param-store',
    pathMatch: 'full',
    redirectTo: 'ngrx-lessons/lesson-06-route-param-store/project-101',
  },
  {
    path: 'ngrx-lessons/lesson-06-route-param-store/:projectId',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-06-route-param-store/lesson-06-route-param-store').then(
        (m) => m.Lesson06RouteParamStore,
      ),
  },
];

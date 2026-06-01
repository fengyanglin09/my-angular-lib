import { Routes } from '@angular/router';

export const ngrxLessonsRoutes: Routes = [
  {
    path: 'lesson-01-counter',
    loadComponent: () =>
      import('./lesson-01-counter/lesson-01-counter').then(
        (m) => m.Lesson01Counter,
      ),
  },
  {
    path: 'lesson-02-todos',
    loadComponent: () =>
      import('./lesson-02-todos/lesson-02-todos').then(
        (m) => m.Lesson02Todos,
      ),
  },
  {
    path: 'lesson-03-effects-products',
    loadComponent: () =>
      import('./lesson-03-effects-products/lesson-03-effects-products').then(
        (m) => m.Lesson03EffectsProducts,
      ),
  },
  {
    path: 'lesson-04-entity-books',
    loadComponent: () =>
      import('./lesson-04-entity-books/lesson-04-entity-books').then(
        (m) => m.Lesson04EntityBooks,
      ),
  },
  {
    path: 'lesson-05-signal-store',
    loadComponent: () =>
      import('./lesson-05-signal-store/lesson-05-signal-store').then(
        (m) => m.Lesson05SignalStore,
      ),
  },
  {
    path: 'lesson-06-route-param-store',
    pathMatch: 'full',
    redirectTo: 'lesson-06-route-param-store/project-101',
  },
  {
    path: 'lesson-06-route-param-store/:projectId',
    loadComponent: () =>
      import('./lesson-06-route-param-store/lesson-06-route-param-store').then(
        (m) => m.Lesson06RouteParamStore,
      ),
  },
  {
    path: 'lesson-07-rxmethod-search',
    loadComponent: () =>
      import('./lesson-07-rxmethod-search/lesson-07-rxmethod-search').then(
        (m) => m.Lesson07RxMethodSearch,
      ),
  },
  {
    path: 'lesson-08-optimistic-updates',
    loadComponent: () =>
      import('./lesson-08-optimistic-updates/lesson-08-optimistic-updates').then(
        (m) => m.Lesson08OptimisticUpdates,
      ),
  },
  {
    path: 'lesson-09-pessimistic-updates',
    loadComponent: () =>
      import('./lesson-09-pessimistic-updates/lesson-09-pessimistic-updates').then(
        (m) => m.Lesson09PessimisticUpdates,
      ),
  },
  {
    path: 'lesson-10-effect-concurrency',
    loadComponent: () =>
      import('./lesson-10-effect-concurrency/lesson-10-effect-concurrency').then(
        (m) => m.Lesson10EffectConcurrency,
      ),
  },
];

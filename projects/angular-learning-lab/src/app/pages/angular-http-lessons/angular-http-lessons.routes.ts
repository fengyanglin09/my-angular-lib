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
  {
    path: 'lesson-04-query-params-headers',
    loadComponent: () =>
      import('./lesson-04-query-params-headers/lesson-04-query-params-headers').then(
        (m) => m.Lesson04QueryParamsHeaders,
      ),
  },
  {
    path: 'lesson-05-error-retry',
    loadComponent: () =>
      import('./lesson-05-error-retry/lesson-05-error-retry').then(
        (m) => m.Lesson05ErrorRetry,
      ),
  },
  {
    path: 'lesson-06-cancellation-switchmap',
    loadComponent: () =>
      import('./lesson-06-cancellation-switchmap/lesson-06-cancellation-switchmap').then(
        (m) => m.Lesson06CancellationSwitchmap,
      ),
  },
  {
    path: 'lesson-07-interceptors-auth',
    loadComponent: () =>
      import('./lesson-07-interceptors-auth/lesson-07-interceptors-auth').then(
        (m) => m.Lesson07InterceptorsAuth,
      ),
  },
  {
    path: 'lesson-08-progress-events',
    loadComponent: () =>
      import('./lesson-08-progress-events/lesson-08-progress-events').then(
        (m) => m.Lesson08ProgressEvents,
      ),
  },
  {
    path: 'lesson-09-dto-mapping-validation',
    loadComponent: () =>
      import('./lesson-09-dto-mapping-validation/lesson-09-dto-mapping-validation').then(
        (m) => m.Lesson09DtoMappingValidation,
      ),
  },
  {
    path: 'lesson-10-api-configuration',
    loadComponent: () =>
      import('./lesson-10-api-configuration/lesson-10-api-configuration').then(
        (m) => m.Lesson10ApiConfiguration,
      ),
  },
];

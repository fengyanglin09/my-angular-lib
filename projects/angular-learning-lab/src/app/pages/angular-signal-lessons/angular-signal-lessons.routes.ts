import { Routes } from '@angular/router';

export const angularSignalLessonsRoutes: Routes = [
  {
    path: 'lesson-01-signal-basics',
    loadComponent: () =>
      import('./lesson-01-signal-basics/lesson-01-signal-basics').then(
        (m) => m.Lesson01SignalBasics,
      ),
  },
  {
    path: 'lesson-02-effects',
    loadComponent: () =>
      import('./lesson-02-effects/lesson-02-effects').then(
        (m) => m.Lesson02Effects,
      ),
  },
  {
    path: 'lesson-03-effect-cleanup',
    loadComponent: () =>
      import('./lesson-03-effect-cleanup/lesson-03-effect-cleanup').then(
        (m) => m.Lesson03EffectCleanup,
      ),
  },
  {
    path: 'lesson-04-input-signals',
    loadComponent: () =>
      import('./lesson-04-input-signals/lesson-04-input-signals').then(
        (m) => m.Lesson04InputSignals,
      ),
  },
  {
    path: 'lesson-05-model-signals',
    loadComponent: () =>
      import('./lesson-05-model-signals/lesson-05-model-signals').then(
        (m) => m.Lesson05ModelSignals,
      ),
  },
  {
    path: 'lesson-06-linked-signal',
    loadComponent: () =>
      import('./lesson-06-linked-signal/lesson-06-linked-signal').then(
        (m) => m.Lesson06LinkedSignal,
      ),
  },
  {
    path: 'lesson-07-rxjs-interop',
    loadComponent: () =>
      import('./lesson-07-rxjs-interop/lesson-07-rxjs-interop').then(
        (m) => m.Lesson07RxjsInterop,
      ),
  },
  {
    path: 'lesson-08-signal-service',
    loadComponent: () =>
      import('./lesson-08-signal-service/lesson-08-signal-service').then(
        (m) => m.Lesson08SignalService,
      ),
  },
  {
    path: 'lesson-09-resource-loading',
    loadComponent: () =>
      import('./lesson-09-resource-loading/lesson-09-resource-loading').then(
        (m) => m.Lesson09ResourceLoading,
      ),
  },
  {
    path: 'lesson-10-signal-queries',
    loadComponent: () =>
      import('./lesson-10-signal-queries/lesson-10-signal-queries').then(
        (m) => m.Lesson10SignalQueries,
      ),
  },
];

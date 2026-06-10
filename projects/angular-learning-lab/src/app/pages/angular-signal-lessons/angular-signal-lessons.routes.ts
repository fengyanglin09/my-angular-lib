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
];

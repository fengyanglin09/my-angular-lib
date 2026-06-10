import { Routes } from '@angular/router';

export const angularSignalLessonsRoutes: Routes = [
  {
    path: 'lesson-01-signal-basics',
    loadComponent: () =>
      import('./lesson-01-signal-basics/lesson-01-signal-basics').then(
        (m) => m.Lesson01SignalBasics,
      ),
  },
];

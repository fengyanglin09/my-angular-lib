import { Routes } from '@angular/router';

export const angularPerformanceLessonsRoutes: Routes = [
  {
    path: 'lesson-01-onpush-change-detection',
    loadComponent: () =>
      import(
        './lesson-01-onpush-change-detection/lesson-01-onpush-change-detection'
      ).then((m) => m.PerformanceLesson01OnpushChangeDetection),
  },
  {
    path: 'lesson-02-signals-change-detection',
    loadComponent: () =>
      import(
        './lesson-02-signals-change-detection/lesson-02-signals-change-detection'
      ).then((m) => m.PerformanceLesson02SignalsChangeDetection),
  },
  {
    path: 'lesson-03-for-track',
    loadComponent: () =>
      import('./lesson-03-for-track/lesson-03-for-track').then(
        (m) => m.PerformanceLesson03ForTrack
      ),
  },
  {
    path: 'lesson-04-lazy-loading',
    loadComponent: () =>
      import('./lesson-04-lazy-loading/lesson-04-lazy-loading').then(
        (m) => m.PerformanceLesson04LazyLoading
      ),
  },
  {
    path: 'lesson-05-defer-blocks',
    loadComponent: () =>
      import('./lesson-05-defer-blocks/lesson-05-defer-blocks').then(
        (m) => m.PerformanceLesson05DeferBlocks
      ),
  },
  {
    path: 'lesson-06-avoid-recomputation',
    loadComponent: () =>
      import(
        './lesson-06-avoid-recomputation/lesson-06-avoid-recomputation'
      ).then((m) => m.PerformanceLesson06AvoidRecomputation),
  },
];

import { Routes } from '@angular/router';

export const angularPipeLessonsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lesson-01-built-in-pipes',
  },
  {
    path: 'lesson-01-built-in-pipes',
    loadComponent: () =>
      import('./lesson-01-built-in-pipes/lesson-01-built-in-pipes').then(
        (m) => m.PipeLesson01BuiltInPipes
      ),
  },
  {
    path: 'lesson-02-custom-pure-pipes',
    loadComponent: () =>
      import('./lesson-02-custom-pure-pipes/lesson-02-custom-pure-pipes').then(
        (m) => m.PipeLesson02CustomPurePipes
      ),
  },
  {
    path: 'lesson-03-pipe-parameters',
    loadComponent: () =>
      import('./lesson-03-pipe-parameters/lesson-03-pipe-parameters').then(
        (m) => m.PipeLesson03PipeParameters
      ),
  },
  {
    path: 'lesson-04-pure-vs-impure-pipes',
    loadComponent: () =>
      import(
        './lesson-04-pure-vs-impure-pipes/lesson-04-pure-vs-impure-pipes'
      ).then((m) => m.PipeLesson04PureVsImpurePipes),
  },
  {
    path: 'lesson-05-async-pipe',
    loadComponent: () =>
      import('./lesson-05-async-pipe/lesson-05-async-pipe').then(
        (m) => m.PipeLesson05AsyncPipe
      ),
  },
  {
    path: 'lesson-06-formatting-api-data',
    loadComponent: () =>
      import(
        './lesson-06-formatting-api-data/lesson-06-formatting-api-data'
      ).then((m) => m.PipeLesson06FormattingApiData),
  },
  {
    path: 'lesson-07-performance-considerations',
    loadComponent: () =>
      import(
        './lesson-07-performance-considerations/lesson-07-performance-considerations'
      ).then((m) => m.PipeLesson07PerformanceConsiderations),
  },
  {
    path: 'lesson-08-pipe-vs-computed-signal-method',
    loadComponent: () =>
      import(
        './lesson-08-pipe-vs-computed-signal-method/lesson-08-pipe-vs-computed-signal-method'
      ).then((m) => m.PipeLesson08PipeVsComputedSignalMethod),
  },
];

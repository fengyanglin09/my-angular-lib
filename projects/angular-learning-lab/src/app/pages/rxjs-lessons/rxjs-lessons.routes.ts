import { Routes } from '@angular/router';

export const rxjsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-observable-basics',
    loadComponent: () =>
      import('./lesson-01-observable-basics/lesson-01-observable-basics').then(
        (m) => m.Lesson01ObservableBasics,
      ),
  },
  {
    path: 'lesson-02-creation-operators',
    loadComponent: () =>
      import('./lesson-02-creation-operators/lesson-02-creation-operators').then(
        (m) => m.Lesson02CreationOperators,
      ),
  },
  {
    path: 'lesson-03-pipeable-operators',
    loadComponent: () =>
      import('./lesson-03-pipeable-operators/lesson-03-pipeable-operators').then(
        (m) => m.Lesson03PipeableOperators,
      ),
  },
  {
    path: 'lesson-04-time-operators',
    loadComponent: () =>
      import('./lesson-04-time-operators/lesson-04-time-operators').then(
        (m) => m.Lesson04TimeOperators,
      ),
  },
  {
    path: 'lesson-05-flattening-operators',
    loadComponent: () =>
      import('./lesson-05-flattening-operators/lesson-05-flattening-operators').then(
        (m) => m.Lesson05FlatteningOperators,
      ),
  },
  {
    path: 'lesson-06-error-handling',
    loadComponent: () =>
      import('./lesson-06-error-handling/lesson-06-error-handling').then(
        (m) => m.Lesson06ErrorHandling,
      ),
  },
  {
    path: 'lesson-07-combining-streams',
    loadComponent: () =>
      import('./lesson-07-combining-streams/lesson-07-combining-streams').then(
        (m) => m.Lesson07CombiningStreams,
      ),
  },
  {
    path: 'lesson-08-angular-subscriptions',
    loadComponent: () =>
      import('./lesson-08-angular-subscriptions/lesson-08-angular-subscriptions').then(
        (m) => m.Lesson08AngularSubscriptions,
      ),
  },
  {
    path: 'lesson-09-http-data-flow',
    loadComponent: () =>
      import('./lesson-09-http-data-flow/lesson-09-http-data-flow').then(
        (m) => m.Lesson09HttpDataFlow,
      ),
  },
  {
    path: 'lesson-10-service-data-flow',
    loadComponent: () =>
      import('./lesson-10-service-data-flow/lesson-10-service-data-flow').then(
        (m) => m.Lesson10ServiceDataFlow,
      ),
  },
  {
    path: 'lesson-11-component-facade',
    loadComponent: () =>
      import('./lesson-11-component-facade/lesson-11-component-facade').then(
        (m) => m.Lesson11ComponentFacade,
      ),
  },
  {
    path: 'lesson-12-subjects-multicasting',
    loadComponent: () =>
      import('./lesson-12-subjects-multicasting/lesson-12-subjects-multicasting').then(
        (m) => m.Lesson12SubjectsMulticasting,
      ),
  },
  {
    path: 'lesson-13-marble-thinking',
    loadComponent: () =>
      import('./lesson-13-marble-thinking/lesson-13-marble-thinking').then(
        (m) => m.Lesson13MarbleThinking,
      ),
  },
  {
    path: 'lesson-14-marble-testing',
    pathMatch: 'full',
    redirectTo: 'lesson-14-scan-state',
  },
  {
    path: 'lesson-14-scan-state',
    loadComponent: () =>
      import('./lesson-14-scan-state/lesson-14-scan-state').then(
        (m) => m.Lesson14ScanState,
      ),
  },
  {
    path: 'lesson-15-pairwise-changes',
    loadComponent: () =>
      import('./lesson-15-pairwise-changes/lesson-15-pairwise-changes').then(
        (m) => m.Lesson15PairwiseChanges,
      ),
  },
  {
    path: 'lesson-16-distinct-until-changed',
    loadComponent: () =>
      import('./lesson-16-distinct-until-changed/lesson-16-distinct-until-changed').then(
        (m) => m.Lesson16DistinctUntilChanged,
      ),
  },
  {
    path: 'lesson-17-merge-reload-triggers',
    loadComponent: () =>
      import('./lesson-17-merge-reload-triggers/lesson-17-merge-reload-triggers').then(
        (m) => m.Lesson17MergeReloadTriggers,
      ),
  },
  {
    path: 'lesson-18-timeout-safety',
    loadComponent: () =>
      import('./lesson-18-timeout-safety/lesson-18-timeout-safety').then(
        (m) => m.Lesson18TimeoutSafety,
      ),
  },
  {
    path: 'lesson-19-audit-time',
    loadComponent: () =>
      import('./lesson-19-audit-time/lesson-19-audit-time').then(
        (m) => m.Lesson19AuditTime,
      ),
  },
];

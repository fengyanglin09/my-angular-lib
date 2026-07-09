import { Routes } from '@angular/router';

export const ramdaLessonsRoutes: Routes = [
  {
    path: 'lesson-01-what-is-ramda',
    loadComponent: () =>
      import('./lesson-01-what-is-ramda/lesson-01-what-is-ramda').then(
        (m) => m.Lesson01WhatIsRamda,
      ),
  },
  {
    path: 'lesson-02-collection-transformations',
    loadComponent: () =>
      import('./lesson-02-collection-transformations/lesson-02-collection-transformations').then(
        (m) => m.Lesson02CollectionTransformations,
      ),
  },
  {
    path: 'lesson-03-immutable-object-updates',
    loadComponent: () =>
      import('./lesson-03-immutable-object-updates/lesson-03-immutable-object-updates').then(
        (m) => m.Lesson03ImmutableObjectUpdates,
      ),
  },
  {
    path: 'lesson-04-pipe-compose',
    loadComponent: () =>
      import('./lesson-04-pipe-compose/lesson-04-pipe-compose').then(
        (m) => m.Lesson04PipeCompose,
      ),
  },
  {
    path: 'lesson-05-predicates',
    loadComponent: () =>
      import('./lesson-05-predicates/lesson-05-predicates').then(
        (m) => m.Lesson05Predicates,
      ),
  },
  {
    path: 'lesson-06-nested-data-lenses',
    loadComponent: () =>
      import('./lesson-06-nested-data-lenses/lesson-06-nested-data-lenses').then(
        (m) => m.Lesson06NestedDataLenses,
      ),
  },
  {
    path: 'lesson-07-currying-partial-application',
    loadComponent: () =>
      import('./lesson-07-currying-partial-application/lesson-07-currying-partial-application').then(
        (m) => m.Lesson07CurryingPartialApplication,
      ),
  },
  {
    path: 'lesson-08-data-shaping-for-ui',
    loadComponent: () =>
      import('./lesson-08-data-shaping-for-ui/lesson-08-data-shaping-for-ui').then(
        (m) => m.Lesson08DataShapingForUi,
      ),
  },
  {
    path: 'lesson-09-ramda-with-ngrx',
    loadComponent: () =>
      import('./lesson-09-ramda-with-ngrx/lesson-09-ramda-with-ngrx').then(
        (m) => m.Lesson09RamdaWithNgrx,
      ),
  },
];

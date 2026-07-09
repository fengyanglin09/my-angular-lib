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
    path: 'lesson-09-ramda-with-ngrx',
    loadComponent: () =>
      import('./lesson-09-ramda-with-ngrx/lesson-09-ramda-with-ngrx').then(
        (m) => m.Lesson09RamdaWithNgrx,
      ),
  },
];

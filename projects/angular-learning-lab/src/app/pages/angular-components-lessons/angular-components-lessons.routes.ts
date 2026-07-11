import { Routes } from '@angular/router';

export const angularComponentsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-smart-presentational',
    loadComponent: () =>
      import(
        './lesson-01-smart-presentational/lesson-01-smart-presentational'
      ).then((m) => m.ComponentsLesson01SmartPresentational),
  },
  {
    path: 'lesson-02-input-output-model',
    loadComponent: () =>
      import(
        './lesson-02-input-output-model/lesson-02-input-output-model'
      ).then((m) => m.ComponentsLesson02InputOutputModel),
  },
  {
    path: 'lesson-03-reusable-component-apis',
    loadComponent: () =>
      import(
        './lesson-03-reusable-component-apis/lesson-03-reusable-component-apis'
      ).then((m) => m.ComponentsLesson03ReusableComponentApis),
  },
  {
    path: 'lesson-04-content-projection',
    loadComponent: () =>
      import(
        './lesson-04-content-projection/lesson-04-content-projection'
      ).then((m) => m.ComponentsLesson04ContentProjection),
  },
  {
    path: 'lesson-05-view-queries',
    loadComponent: () =>
      import('./lesson-05-view-queries/lesson-05-view-queries').then(
        (m) => m.ComponentsLesson05ViewQueries
      ),
  },
  {
    path: 'lesson-06-content-queries',
    loadComponent: () =>
      import('./lesson-06-content-queries/lesson-06-content-queries').then(
        (m) => m.ComponentsLesson06ContentQueries
      ),
  },
  {
    path: 'lesson-07-component-communication',
    loadComponent: () =>
      import(
        './lesson-07-component-communication/lesson-07-component-communication'
      ).then((m) => m.ComponentsLesson07ComponentCommunication),
  },
  {
    path: 'lesson-08-state-ownership',
    loadComponent: () =>
      import('./lesson-08-state-ownership/lesson-08-state-ownership').then(
        (m) => m.ComponentsLesson08StateOwnership
      ),
  },
];

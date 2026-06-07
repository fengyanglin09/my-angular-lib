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
];

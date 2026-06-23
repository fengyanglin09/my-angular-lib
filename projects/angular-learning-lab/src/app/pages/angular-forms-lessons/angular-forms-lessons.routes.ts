import { Routes } from '@angular/router';

export const angularFormsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-reactive-form-basics',
    loadComponent: () =>
      import('./lesson-01-reactive-form-basics/lesson-01-reactive-form-basics').then(
        (m) => m.Lesson01ReactiveFormBasics,
      ),
  },
  {
    path: 'lesson-02-form-builder',
    loadComponent: () =>
      import('./lesson-02-form-builder/lesson-02-form-builder').then(
        (m) => m.Lesson02FormBuilder,
      ),
  },
  {
    path: 'lesson-03-form-factory',
    loadComponent: () =>
      import('./lesson-03-form-factory/lesson-03-form-factory').then(
        (m) => m.Lesson03FormFactory,
      ),
  },
  {
    path: 'lesson-04-validation-patterns',
    loadComponent: () =>
      import('./lesson-04-validation-patterns/lesson-04-validation-patterns').then(
        (m) => m.Lesson04ValidationPatterns,
      ),
  },
];

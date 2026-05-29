import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ngrx-lessons/lesson-01-counter',
  },
  {
    path: 'ngrx-lessons/lesson-01-counter',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-01-counter/lesson-01-counter').then(
        (m) => m.Lesson01Counter,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-02-todos',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-02-todos/lesson-02-todos').then(
        (m) => m.Lesson02Todos,
      ),
  },
  {
    path: 'ngrx-lessons/lesson-03-effects-products',
    loadComponent: () =>
      import('./pages/ngrx-lessons/lesson-03-effects-products/lesson-03-effects-products').then(
        (m) => m.Lesson03EffectsProducts,
      ),
  },
];

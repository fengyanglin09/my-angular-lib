import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(
        (m) => m.Home,
      ),
  },
  {
    path: 'ngrx-lessons',
    loadChildren: () =>
      import('./pages/ngrx-lessons/ngrx-lessons.routes').then(
        (m) => m.ngrxLessonsRoutes,
      ),
  },
  {
    path: 'rxjs-lessons',
    loadChildren: () =>
      import('./pages/rxjs-lessons/rxjs-lessons.routes').then(
        (m) => m.rxjsLessonsRoutes,
      ),
  },
  {
    path: 'angular-signal-lessons',
    loadChildren: () =>
      import('./pages/angular-signal-lessons/angular-signal-lessons.routes').then(
        (m) => m.angularSignalLessonsRoutes,
      ),
  },
  {
    path: 'angular-forms-lessons',
    loadChildren: () =>
      import('./pages/angular-forms-lessons/angular-forms-lessons.routes').then(
        (m) => m.angularFormsLessonsRoutes,
      ),
  },
];

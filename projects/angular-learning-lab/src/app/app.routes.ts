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
    path: 'ramda-lessons',
    loadChildren: () =>
      import('./pages/ramda-lessons/ramda-lessons.routes').then(
        (m) => m.ramdaLessonsRoutes,
      ),
  },
  {
    path: 'ngrx-ramda-lessons',
    redirectTo: 'ramda-lessons/lesson-09-ramda-with-ngrx',
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
  {
    path: 'angular-route-lessons',
    loadChildren: () =>
      import('./pages/angular-route-lessons/angular-route-lessons.routes').then(
        (m) => m.angularRouteLessonsRoutes,
      ),
  },
];

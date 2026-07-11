import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'ngrx-lessons',
    loadChildren: () =>
      import('./pages/ngrx-lessons/ngrx-lessons.routes').then(
        (m) => m.ngrxLessonsRoutes
      ),
  },
  {
    path: 'ramda-lessons',
    loadChildren: () =>
      import('./pages/ramda-lessons/ramda-lessons.routes').then(
        (m) => m.ramdaLessonsRoutes
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
        (m) => m.rxjsLessonsRoutes
      ),
  },
  {
    path: 'angular-signal-lessons',
    loadChildren: () =>
      import(
        './pages/angular-signal-lessons/angular-signal-lessons.routes'
      ).then((m) => m.angularSignalLessonsRoutes),
  },
  {
    path: 'angular-forms-lessons',
    loadChildren: () =>
      import('./pages/angular-forms-lessons/angular-forms-lessons.routes').then(
        (m) => m.angularFormsLessonsRoutes
      ),
  },
  {
    path: 'angular-components-lessons',
    loadChildren: () =>
      import(
        './pages/angular-components-lessons/angular-components-lessons.routes'
      ).then((m) => m.angularComponentsLessonsRoutes),
  },
  {
    path: 'angular-directive-lessons',
    loadChildren: () =>
      import(
        './pages/angular-directive-lessons/angular-directive-lessons.routes'
      ).then((m) => m.angularDirectiveLessonsRoutes),
  },
  {
    path: 'angular-pipe-lessons',
    loadChildren: () =>
      import('./pages/angular-pipe-lessons/angular-pipe-lessons.routes').then(
        (m) => m.angularPipeLessonsRoutes
      ),
  },
  {
    path: 'angular-performance-lessons',
    loadChildren: () =>
      import(
        './pages/angular-performance-lessons/angular-performance-lessons.routes'
      ).then((m) => m.angularPerformanceLessonsRoutes),
  },
  {
    path: 'angular-dependency-injection-lessons',
    loadChildren: () =>
      import(
        './pages/angular-dependency-injection-lessons/angular-dependency-injection-lessons.routes'
      ).then((m) => m.angularDependencyInjectionLessonsRoutes),
  },
  {
    path: 'angular-auth-lessons',
    loadChildren: () =>
      import('./pages/angular-auth-lessons/angular-auth-lessons.routes').then(
        (m) => m.angularAuthLessonsRoutes
      ),
  },
  {
    path: 'angular-layout-lessons',
    loadChildren: () =>
      import(
        './pages/angular-layout-lessons/angular-layout-lessons.routes'
      ).then((m) => m.angularLayoutLessonsRoutes),
  },
  {
    path: 'angular-http-lessons',
    loadChildren: () =>
      import('./pages/angular-http-lessons/angular-http-lessons.routes').then(
        (m) => m.angularHttpLessonsRoutes
      ),
  },
  {
    path: 'angular-route-lessons',
    loadChildren: () =>
      import('./pages/angular-route-lessons/angular-route-lessons.routes').then(
        (m) => m.angularRouteLessonsRoutes
      ),
  },
];

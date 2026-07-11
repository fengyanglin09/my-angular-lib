import { Routes } from '@angular/router';

export const angularLayoutLessonsRoutes: Routes = [
  {
    path: 'lesson-01-shell-layout',
    loadComponent: () =>
      import('./lesson-01-shell-layout/lesson-01-shell-layout').then(
        (m) => m.LayoutLesson01ShellLayout
      ),
  },
  {
    path: 'lesson-02-sidenav-topnav',
    loadComponent: () =>
      import('./lesson-02-sidenav-topnav/lesson-02-sidenav-topnav').then(
        (m) => m.LayoutLesson02SidenavTopnav
      ),
  },
  {
    path: 'lesson-03-feature-folders',
    loadComponent: () =>
      import('./lesson-03-feature-folders/lesson-03-feature-folders').then(
        (m) => m.LayoutLesson03FeatureFolders
      ),
  },
  {
    path: 'lesson-04-reusable-page-layouts',
    loadComponent: () =>
      import(
        './lesson-04-reusable-page-layouts/lesson-04-reusable-page-layouts'
      ).then((m) => m.LayoutLesson04ReusablePageLayouts),
  },
  {
    path: 'lesson-05-design-consistency',
    loadComponent: () =>
      import(
        './lesson-05-design-consistency/lesson-05-design-consistency'
      ).then((m) => m.LayoutLesson05DesignConsistency),
  },
  {
    path: 'lesson-06-dashboards-detail-pages',
    loadComponent: () =>
      import(
        './lesson-06-dashboards-detail-pages/lesson-06-dashboards-detail-pages'
      ).then((m) => m.LayoutLesson06DashboardsDetailPages),
  },
];

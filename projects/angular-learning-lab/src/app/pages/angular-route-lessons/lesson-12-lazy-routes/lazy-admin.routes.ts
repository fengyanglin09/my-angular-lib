import { Routes } from '@angular/router';

import { LazyAdminOverviewPanel } from './lazy-admin-overview-panel';
import { LazyAdminReportsPanel } from './lazy-admin-reports-panel';

export const lazyAdminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    title: 'Routes Lesson 12 - Lazy Admin Overview',
    component: LazyAdminOverviewPanel,
  },
  {
    path: 'reports',
    title: 'Routes Lesson 12 - Lazy Admin Reports',
    component: LazyAdminReportsPanel,
  },
];

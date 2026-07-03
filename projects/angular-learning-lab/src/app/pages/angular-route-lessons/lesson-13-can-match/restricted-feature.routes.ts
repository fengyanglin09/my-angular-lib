import { Routes } from '@angular/router';

import { RestrictedFeatureHomePanel } from './restricted-feature-home-panel';
import { RestrictedFeatureReportsPanel } from './restricted-feature-reports-panel';

export const restrictedFeatureRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    title: 'Routes Lesson 13 - Protected Overview',
    component: RestrictedFeatureHomePanel,
  },
  {
    path: 'reports',
    title: 'Routes Lesson 13 - Protected Reports',
    component: RestrictedFeatureReportsPanel,
  },
];

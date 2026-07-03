import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { LazyRoutesLogService } from './lazy-routes-log.service';

@Component({
  selector: 'app-lesson-12-lazy-routes',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-12-lazy-routes.html',
  styleUrl: './lesson-12-lazy-routes.css',
})
export class Lesson12LazyRoutes {
  protected readonly log = inject(LazyRoutesLogService);
  protected readonly activePanel = signal('No lazy child route active yet');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'loadChildren imports a child route array only when that branch is needed.',
      name: 'parent route',
      syntax: `{
  path: 'admin',
  loadChildren: () =>
    import('./lazy-admin.routes').then(
      (m) => m.lazyAdminRoutes
    )
}`,
    },
    {
      description: 'The lazy route file exports normal child routes.',
      name: 'lazy route file',
      syntax: `export const lazyAdminRoutes: Routes = [
  { path: '', redirectTo: 'overview' },
  { path: 'overview', component: OverviewPanel },
  { path: 'reports', component: ReportsPanel }
];`,
    },
    {
      description: 'The parent still needs a router-outlet where lazy children can render.',
      name: 'parent outlet',
      syntax: `<router-outlet
  (activate)="childActivated($event)"
/>`,
    },
    {
      description: 'The URL includes both the parent lesson path and the lazy child path.',
      name: 'matched URL',
      syntax: `/lesson-12-lazy-routes/admin/overview

lesson parent:
  lesson-12-lazy-routes

lazy child group:
  admin/overview`,
    },
    {
      description: 'loadComponent lazy-loads one component. loadChildren lazy-loads a route group.',
      name: 'load choice',
      syntax: `loadComponent
  one standalone page

loadChildren
  a feature route file
  with its own child routes`,
    },
    {
      description: 'Use lazy route groups for feature areas the user may not visit immediately.',
      name: 'when to use',
      syntax: `good lazy groups:
  admin
  account settings
  reports
  support tools

keep eager:
  app shell
  main dashboard
  tiny common pages`,
    },
  ];

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown lazy child');
  }
}

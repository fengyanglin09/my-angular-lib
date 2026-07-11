import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { DashboardsDetailPagesDemo } from './dashboards-detail-pages-demo';

export const layoutLesson06 = {
  number: 6,
  route: 'lesson-06-dashboards-detail-pages',
  title: 'Dashboards And Detail Pages',
  intro:
    'Dashboards and detail pages have different jobs. Dashboards summarize and route attention; detail pages support focused inspection and action.',
  keyPoints: [
    'Dashboards should prioritize scanning and comparison.',
    'Detail pages should prioritize context, status, and primary actions.',
    'Use route structure to make list, dashboard, and detail relationships clear.',
  ],
  mentalModel: `dashboard
  summarize
  compare
  navigate

detail page
  inspect
  edit
  act

routes
  make the workflow explicit`,
  demo: {
    title: 'Projects dashboard to project detail',
    before: 'A single page tries to show every summary and every detail.',
    after: 'Dashboard links to focused detail pages.',
    actionLabel: 'Open detail route',
  },
  codeSteps: [
    {
      name: 'Dashboard route',
      description: 'The dashboard gives a high-level overview.',
      syntax: `{ path: 'projects', component: ProjectsDashboardPage }`,
    },
    {
      name: 'Detail route',
      description: 'The detail route focuses on one entity.',
      syntax: `{ path: 'projects/:projectId', component: ProjectDetailPage }`,
    },
    {
      name: 'Dashboard card link',
      description: 'Cards should link to deeper workflows.',
      syntax: `<a [routerLink]="['/projects', project.id]">
  View project
</a>`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-06-dashboards-detail-pages',
  imports: [LayoutLessonPage, DashboardsDetailPagesDemo],
  templateUrl: './lesson-06-dashboards-detail-pages.html',
  styleUrl: './lesson-06-dashboards-detail-pages.css',
})
export class LayoutLesson06DashboardsDetailPages {
  protected readonly lesson = layoutLesson06;
}

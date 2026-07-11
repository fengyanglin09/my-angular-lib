import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { FeatureFoldersDemo } from './feature-folders-demo';

export const layoutLesson03 = {
  number: 3,
  route: 'lesson-03-feature-folders',
  title: 'Feature Folders',
  intro:
    'Feature folders keep pages, components, services, models, and routes close to the feature that owns them.',
  keyPoints: [
    'Group by feature when files change together.',
    'Keep shared UI and utilities separate from feature-specific code.',
    'Lazy feature route files make feature boundaries explicit.',
  ],
  mentalModel: `feature folder
  routes
  pages
  components
  services
  models

shared folder
  truly reused building blocks`,
  demo: {
    title: 'Orders feature folder',
    before: 'Orders files are scattered by technical type.',
    after: 'Orders files live together around the feature route.',
    actionLabel: 'Group feature files',
  },
  codeSteps: [
    {
      name: 'Feature route file',
      description: 'A feature can own its route definitions.',
      syntax: `orders/
  orders.routes.ts
  pages/
  components/
  services/
  models/`,
    },
    {
      name: 'Lazy boundary',
      description: 'The app route table points at the feature route file.',
      syntax: `{
  path: 'orders',
  loadChildren: () =>
    import('./orders/orders.routes').then((m) => m.ordersRoutes),
}`,
    },
    {
      name: 'Shared carefully',
      description:
        'Move code to shared only after more than one feature truly needs it.',
      syntax: `shared/
  ui/
  data-access/
  utils/`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-03-feature-folders',
  imports: [LayoutLessonPage, FeatureFoldersDemo],
  templateUrl: './lesson-03-feature-folders.html',
  styleUrl: './lesson-03-feature-folders.css',
})
export class LayoutLesson03FeatureFolders {
  protected readonly lesson = layoutLesson03;
}

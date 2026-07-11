import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { LazyLoadingDemo } from './lazy-loading-demo';

export const performanceLesson04 = {
  number: 4,
  route: 'lesson-04-lazy-loading',
  title: 'Lazy Loading',
  intro:
    'Lazy loading keeps expensive feature code out of the initial bundle until the user navigates to that feature.',
  keyPoints: [
    'Use loadChildren for feature route files.',
    'Use loadComponent for a single lazy standalone component.',
    'Lazy loading improves initial load, but the feature still downloads when visited.',
  ],
  mentalModel: `initial app
  loads shell and current route

lazy route
  waits outside main bundle

navigation
  downloads feature chunk`,
  demo: {
    title: 'Reports feature loads on demand',
    before: 'Reports code is not in the first route bundle.',
    after: 'Navigating to reports downloads the reports chunk.',
    actionLabel: 'Simulate route visit',
  },
  codeSteps: [
    {
      name: 'Lazy route file',
      description: 'Use loadChildren for a feature route tree.',
      syntax: `{
  path: 'reports',
  loadChildren: () =>
    import('./reports.routes').then((m) => m.reportsRoutes),
}`,
    },
    {
      name: 'Lazy component',
      description: 'Use loadComponent for one standalone page.',
      syntax: `{
  path: 'settings',
  loadComponent: () =>
    import('./settings-page').then((m) => m.SettingsPage),
}`,
    },
    {
      name: 'Do not over-split',
      description: 'Too many tiny chunks can add network overhead.',
      syntax: `Lazy load feature boundaries,
not every small component.`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-04-lazy-loading',
  imports: [PerformanceLessonPage, LazyLoadingDemo],
  templateUrl: './lesson-04-lazy-loading.html',
  styleUrl: './lesson-04-lazy-loading.css',
})
export class PerformanceLesson04LazyLoading {
  protected readonly lesson = performanceLesson04;
}

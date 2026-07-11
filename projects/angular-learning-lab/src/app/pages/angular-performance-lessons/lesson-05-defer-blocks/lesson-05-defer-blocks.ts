import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { DeferBlocksDemo } from './defer-blocks-demo';

export const performanceLesson05 = {
  number: 5,
  route: 'lesson-05-defer-blocks',
  title: 'Defer Blocks',
  intro:
    '@defer lets you delay rendering and downloading expensive UI until it is needed, such as below-the-fold panels or heavy widgets.',
  keyPoints: [
    'Use @defer for expensive UI that is not immediately needed.',
    'Use placeholder and loading blocks so the page does not feel broken.',
    'Do not defer critical first-screen content.',
  ],
  mentalModel: `critical UI
  render now

expensive secondary UI
  defer until trigger

placeholder/loading
  keep layout understandable`,
  demo: {
    title: 'Analytics chart deferred until visible',
    before: 'Main page content renders immediately.',
    after: 'Chart code loads later when the chart section is needed.',
    actionLabel: 'Reveal deferred panel',
  },
  codeSteps: [
    {
      name: 'Defer on viewport',
      description: 'Load the block when the placeholder enters the viewport.',
      syntax: `@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <app-chart-skeleton />
}`,
    },
    {
      name: 'Defer on interaction',
      description: 'Load when the user interacts with a trigger.',
      syntax: `@defer (on interaction(loadButton)) {
  <app-advanced-editor />
}`,
    },
    {
      name: 'Loading block',
      description:
        'Show feedback while the deferred dependency is downloading.',
      syntax: `@loading {
  <p>Loading advanced tools...</p>
}`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-05-defer-blocks',
  imports: [PerformanceLessonPage, DeferBlocksDemo],
  templateUrl: './lesson-05-defer-blocks.html',
  styleUrl: './lesson-05-defer-blocks.css',
})
export class PerformanceLesson05DeferBlocks {
  protected readonly lesson = performanceLesson05;
}

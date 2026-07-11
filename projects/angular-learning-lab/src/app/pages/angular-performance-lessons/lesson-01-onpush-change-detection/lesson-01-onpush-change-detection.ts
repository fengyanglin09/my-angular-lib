import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { OnpushChangeDetectionDemo } from './onpush-change-detection-demo';

export const performanceLesson01 = {
  number: 1,
  route: 'lesson-01-onpush-change-detection',
  title: 'OnPush Change Detection',
  intro:
    'OnPush tells Angular to check a component when its inputs change, an event happens in the component, an async binding emits, or a signal used by the template changes.',
  keyPoints: [
    'OnPush works best when inputs are treated immutably.',
    'A new object or array reference tells Angular the input changed.',
    'OnPush is not a magic speed button; it works because it narrows when checks are needed.',
  ],
  mentalModel: `default change detection
  check broadly

OnPush
  check when there is a reason

new reference
  tells child input changed`,
  demo: {
    title: 'Product card receives a new product reference',
    before: 'Mutating product.name keeps the same object reference.',
    after:
      'Replacing product with a new object gives OnPush a clear change signal.',
    actionLabel: 'Replace product reference',
  },
  codeSteps: [
    {
      name: 'Enable OnPush',
      description: 'OnPush is configured at the component boundary.',
      syntax: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {}`,
    },
    {
      name: 'Prefer immutable updates',
      description: 'Return a new object or array when input data changes.',
      syntax: `this.product.update((product) => ({
  ...product,
  name: 'Updated name',
}));`,
    },
    {
      name: 'Avoid hidden mutation',
      description:
        'Mutation can make it harder to reason about whether a child should update.',
      syntax: `// Avoid for input state
product.name = 'Updated name';`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-01-onpush-change-detection',
  imports: [PerformanceLessonPage, OnpushChangeDetectionDemo],
  templateUrl: './lesson-01-onpush-change-detection.html',
  styleUrl: './lesson-01-onpush-change-detection.css',
})
export class PerformanceLesson01OnpushChangeDetection {
  protected readonly lesson = performanceLesson01;
}

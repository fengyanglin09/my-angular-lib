import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { SignalsChangeDetectionDemo } from './signals-change-detection-demo';

export const performanceLesson02 = {
  number: 2,
  route: 'lesson-02-signals-change-detection',
  title: 'Signals And Change Detection',
  intro:
    'Signals make Angular updates more targeted because Angular can track which templates read which signal values.',
  keyPoints: [
    'Reading a signal in a template connects that template to the signal.',
    'Updating a signal marks the relevant consumers for refresh.',
    'Computed signals should derive values rather than perform side effects.',
  ],
  mentalModel: `template reads signal
  count()

signal updates
  count.set(2)

Angular knows
  this template depends on count`,
  demo: {
    title: 'Counter summary updates from signal reads',
    before: 'A template reads count() and countLabel().',
    after: 'Only signal consumers need to refresh when count changes.',
    actionLabel: 'Update signal value',
  },
  codeSteps: [
    {
      name: 'Writable signal',
      description: 'Writable signals hold local reactive state.',
      syntax: `readonly count = signal(0);`,
    },
    {
      name: 'Computed signal',
      description: 'Computed values rerun when the signals they read change.',
      syntax: `readonly countLabel = computed(() =>
  'Current count: ' + this.count()
);`,
    },
    {
      name: 'Template read',
      description: 'The template subscribes by reading the signal function.',
      syntax: `<p>{{ countLabel() }}</p>`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-02-signals-change-detection',
  imports: [PerformanceLessonPage, SignalsChangeDetectionDemo],
  templateUrl: './lesson-02-signals-change-detection.html',
  styleUrl: './lesson-02-signals-change-detection.css',
})
export class PerformanceLesson02SignalsChangeDetection {
  protected readonly lesson = performanceLesson02;
}

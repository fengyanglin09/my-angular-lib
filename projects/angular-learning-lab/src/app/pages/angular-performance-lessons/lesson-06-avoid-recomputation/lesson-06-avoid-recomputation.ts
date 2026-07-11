import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { AvoidRecomputationDemo } from './avoid-recomputation-demo';

export const performanceLesson06 = {
  number: 6,
  route: 'lesson-06-avoid-recomputation',
  title: 'Avoiding Unnecessary Recomputation',
  intro:
    'Expensive filtering, sorting, and mapping should be derived deliberately. Avoid calling heavy methods directly from templates.',
  keyPoints: [
    'Use computed for derived signal state.',
    'Keep expensive work out of template method calls.',
    'Split derived values when only part of the calculation needs to rerun.',
  ],
  mentalModel: `template method
  can run often

computed
  reruns when dependencies change

small derivations
  make recomputation easier to reason about`,
  demo: {
    title: 'Filtered course list',
    before: 'Template calls filterCourses() repeatedly.',
    after: 'computed filteredCourses recalculates only when inputs change.',
    actionLabel: 'Change filter signal',
  },
  codeSteps: [
    {
      name: 'Computed derivation',
      description:
        'Computed caches the derived value until one of its signal dependencies changes.',
      syntax: `readonly filteredCourses = computed(() =>
  this.courses().filter((course) =>
    course.title.includes(this.query())
  )
);`,
    },
    {
      name: 'Avoid template work',
      description: 'A method in the template may run more often than expected.',
      syntax: `<!-- Avoid heavy work here -->
@for (course of filterCourses(); track course.id) { ... }`,
    },
    {
      name: 'Use derived signal',
      description: 'Read the already-derived value in the template.',
      syntax: `@for (course of filteredCourses(); track course.id) {
  <app-course-row [course]="course" />
}`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-06-avoid-recomputation',
  imports: [PerformanceLessonPage, AvoidRecomputationDemo],
  templateUrl: './lesson-06-avoid-recomputation.html',
  styleUrl: './lesson-06-avoid-recomputation.css',
})
export class PerformanceLesson06AvoidRecomputation {
  protected readonly lesson = performanceLesson06;
}

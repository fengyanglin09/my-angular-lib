import { Component } from '@angular/core';

import type { PerformanceLesson } from '../angular-performance-lessons.models';
import { PerformanceLessonPage } from '../performance-lesson-page/performance-lesson-page';
import { ForTrackDemo } from './for-track-demo';

export const performanceLesson03 = {
  number: 3,
  route: 'lesson-03-for-track',
  title: '@for track And List Rendering',
  intro:
    'Tracking list items gives Angular a stable identity for each row. That helps Angular reuse DOM instead of throwing away and rebuilding rows unnecessarily.',
  keyPoints: [
    'Track by a stable id when rendering backend data.',
    'Avoid tracking by index when items can be inserted, removed, or sorted.',
    'Good tracking preserves DOM state such as focus and input values.',
  ],
  mentalModel: `list changes
  add, remove, sort

track expression
  tells Angular which item is which

stable id
  reuse the right DOM row`,
  demo: {
    title: 'Course list sorted by title',
    before: 'Without stable tracking, rows can be recreated unnecessarily.',
    after: 'track course.id lets Angular move existing rows.',
    actionLabel: 'Simulate list reorder',
  },
  codeSteps: [
    {
      name: 'Track by id',
      description: 'Use this for most backend records.',
      syntax: `@for (course of courses(); track course.id) {
  <app-course-row [course]="course" />
}`,
    },
    {
      name: 'Index is fragile',
      description: 'Index changes when the list is sorted or filtered.',
      syntax: `@for (course of courses(); track $index) {
  ...
}`,
    },
    {
      name: 'Old trackBy equivalent',
      description: 'Older Angular templates used trackBy functions with ngFor.',
      syntax: `trackByCourseId(_index: number, course: Course): string {
  return course.id;
}`,
    },
  ],
} satisfies PerformanceLesson;

@Component({
  selector: 'app-performance-lesson-03-for-track',
  imports: [PerformanceLessonPage, ForTrackDemo],
  templateUrl: './lesson-03-for-track.html',
  styleUrl: './lesson-03-for-track.css',
})
export class PerformanceLesson03ForTrack {
  protected readonly lesson = performanceLesson03;
}

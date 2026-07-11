import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { SmartPresentationalDemo } from './smart-presentational-demo';

export const componentLesson01 = {
  number: 1,
  route: 'lesson-01-smart-presentational',
  title: 'Smart vs Presentational Components',
  intro:
    'Split components by responsibility: smart components own data access and decisions; presentational components receive data and report user intent.',
  keyPoints: [
    'Smart components coordinate services, routes, stores, or backend calls.',
    'Presentational components render inputs and emit events.',
    'This pattern keeps reusable UI components easier to test and reuse.',
  ],
  mentalModel: `smart component
  knows where data comes from
  decides what happens next

presentational component
  receives inputs
  emits user intent
  stays reusable`,
  demo: {
    title: 'Dashboard parent passes a selected course into a card',
    before: 'Parent owns selectedCourse and loading state.',
    after: 'Child receives course input and emits refreshClicked.',
    actionLabel: 'Simulate child refresh event',
  },
  codeSteps: [
    {
      name: 'Smart parent',
      description: 'The smart component owns app-specific state and behavior.',
      syntax: `selectedCourse = signal<Course | null>(null);

refreshCourse(): void {
  this.coursesApi.loadCourse()
    .subscribe((course) => this.selectedCourse.set(course));
}`,
    },
    {
      name: 'Presentational child',
      description:
        'The child does not know where data came from. It only renders and reports intent.',
      syntax: `course = input.required<Course>();
refreshClicked = output<void>();`,
    },
    {
      name: 'Template connection',
      description:
        'The parent connects its state and method to the child component API.',
      syntax: `<app-course-card
  [course]="selectedCourse()"
  (refreshClicked)="refreshCourse()"
/>`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-01-smart-presentational',
  imports: [ComponentsLessonPage, SmartPresentationalDemo],
  templateUrl: './lesson-01-smart-presentational.html',
  styleUrl: './lesson-01-smart-presentational.css',
})
export class ComponentsLesson01SmartPresentational {
  protected readonly lesson = componentLesson01;
}

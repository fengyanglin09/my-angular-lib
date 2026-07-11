import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { ReusableComponentApisDemo } from './reusable-component-apis-demo';

export const componentLesson03 = {
  number: 3,
  route: 'lesson-03-reusable-component-apis',
  title: 'Reusable Component APIs',
  intro:
    'Reusable components need small, explicit APIs. A good API makes common usage easy and keeps app-specific decisions outside the component.',
  keyPoints: [
    'Prefer a few clear inputs over a bag of unrelated configuration.',
    'Emit intent such as saved, cancelled, or selected instead of doing app-specific work inside the reusable component.',
    'Use content projection when callers need to provide custom markup.',
  ],
  mentalModel: `component API
  inputs configure
  outputs report intent
  projected content customizes layout

avoid
  hidden service calls
  too many unrelated flags`,
  demo: {
    title: 'Reusable empty state',
    before: 'Component displays title, message, and action label.',
    after: 'Parent decides what action means.',
    actionLabel: 'Simulate empty-state action',
  },
  codeSteps: [
    {
      name: 'Small API',
      description: 'Inputs explain what the component needs to render.',
      syntax: `title = input.required<string>();
message = input.required<string>();
actionLabel = input<string>('Try again');
action = output<void>();`,
    },
    {
      name: 'No app-specific behavior',
      description:
        'The reusable component does not fetch data or navigate by itself.',
      syntax: `protected actionClicked(): void {
  this.action.emit();
}`,
    },
    {
      name: 'Parent owns meaning',
      description:
        'The caller decides whether action means reload, create, navigate, or dismiss.',
      syntax: `<app-empty-state
  title="No courses"
  message="Try a different filter."
  actionLabel="Clear filters"
  (action)="clearFilters()"
/>`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-03-reusable-component-apis',
  imports: [ComponentsLessonPage, ReusableComponentApisDemo],
  templateUrl: './lesson-03-reusable-component-apis.html',
  styleUrl: './lesson-03-reusable-component-apis.css',
})
export class ComponentsLesson03ReusableComponentApis {
  protected readonly lesson = componentLesson03;
}

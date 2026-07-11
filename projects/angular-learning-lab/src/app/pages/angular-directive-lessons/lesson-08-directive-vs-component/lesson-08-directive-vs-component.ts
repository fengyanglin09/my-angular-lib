import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { DirectiveVsComponentDemo } from './directive-vs-component-demo';

export const directiveLesson08 = {
  number: 8,
  route: 'lesson-08-directive-vs-component',
  title: 'Directive Vs Component',
  intro:
    'A directive is best for behavior on existing markup. A component is best when a reusable thing owns its own template and layout.',
  keyPoints: [
    'Choose a directive when the host element is the important thing.',
    'Choose a component when the reusable unit needs its own structure.',
    'If a directive starts owning too much markup or state, it may want to become a component.',
  ],
  mentalModel: `directive
  attaches behavior
  host owns markup

component
  owns markup
  exposes API

choose by ownership`,
  demo: {
    title: 'Behavior or owned UI',
    before: 'It is unclear whether to create a directive or a component.',
    after:
      'The choice follows ownership: behavior belongs to directives; layout belongs to components.',
    actionLabel: 'Run directive vs component demo',
  },
  codeSteps: [
    {
      name: 'Directive fit',
      description: 'Use a directive when the caller already owns the markup.',
      syntax: `<article [appAttention]="needsReview()">
  Existing content
</article>`,
    },
    {
      name: 'Component fit',
      description:
        'Use a component when the reusable unit owns layout and content structure.',
      syntax: `<app-empty-state-panel />`,
    },
    {
      name: 'Decision question',
      description: 'Ask which thing owns the template.',
      syntax: `Existing element needs behavior?
  directive

Reusable UI owns markup?
  component`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-08-directive-vs-component',
  imports: [DirectiveLessonPage, DirectiveVsComponentDemo],
  templateUrl: './lesson-08-directive-vs-component.html',
  styleUrl: './lesson-08-directive-vs-component.css',
})
export class DirectiveLesson08DirectiveVsComponent {
  protected readonly lesson = directiveLesson08;
}

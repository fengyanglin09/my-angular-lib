import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { DomBehaviorDemo } from './dom-behavior-demo';

export const directiveLesson07 = {
  number: 7,
  route: 'lesson-07-tooltip-autofocus-clickoutside',
  title: 'Tooltip, Autofocus, And Click Outside',
  intro:
    'Small DOM behaviors are often better as directives because they enhance existing elements without owning the page layout.',
  keyPoints: [
    'Tooltip and autofocus directives attach behavior to an existing control.',
    'Click-outside directives listen beyond the host element and emit a close event.',
    'Keep DOM behavior directives focused; avoid turning them into hidden components.',
  ],
  mentalModel: `existing control
  needs browser behavior

directive attaches behavior
  tooltip
  focus
  outside click

component stays about workflow`,
  demo: {
    title: 'Small reusable DOM behaviors',
    before: 'The page would need repeated event and DOM code.',
    after: 'Focused directives keep the component template readable.',
    actionLabel: 'Run DOM behavior demo',
  },
  codeSteps: [
    {
      name: 'Tooltip',
      description: 'A tooltip directive can bind host attributes and classes.',
      syntax: `<button appDemoTooltip="Helpful detail">
  Hover
</button>`,
    },
    {
      name: 'Autofocus',
      description:
        'An autofocus directive can focus its host element after render.',
      syntax: `<input [appDemoAutofocus]="focusCycle()" />`,
    },
    {
      name: 'Click outside',
      description:
        'A click-outside directive emits when a document click is outside the host.',
      syntax: `<section
  appDemoClickOutside
  (appDemoClickOutside)="closePanel()">
</section>`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-07-tooltip-autofocus-clickoutside',
  imports: [DirectiveLessonPage, DomBehaviorDemo],
  templateUrl: './lesson-07-tooltip-autofocus-clickoutside.html',
  styleUrl: './lesson-07-tooltip-autofocus-clickoutside.css',
})
export class DirectiveLesson07TooltipAutofocusClickOutside {
  protected readonly lesson = directiveLesson07;
}

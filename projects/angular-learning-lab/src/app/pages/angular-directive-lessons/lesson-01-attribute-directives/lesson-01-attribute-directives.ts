import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { StatusHighlightDemo } from './status-highlight-demo';

export const directiveLesson01 = {
  number: 1,
  route: 'lesson-01-attribute-directives',
  title: 'Attribute Directives',
  intro:
    'Attribute directives attach behavior, styling, or DOM coordination to an existing element without owning the element layout.',
  keyPoints: [
    'Use an attribute directive when the host element already exists and only needs behavior.',
    'The directive instance belongs to the element where the attribute is placed.',
    'Inputs let each host element configure the same directive differently.',
  ],
  mentalModel: `existing element
  plus directive attribute
  equals enhanced element

component owns markup
directive owns behavior`,
  demo: {
    title: 'Status highlight behavior',
    before: 'The card is a normal article element.',
    after: 'The directive changes styles based on the status input.',
    actionLabel: 'Run attribute directive demo',
  },
  codeSteps: [
    {
      name: 'Create directive',
      description:
        'The selector is the attribute that appears in the template.',
      syntax: `@Directive({
  selector: '[appStatusHighlight]',
})
export class StatusHighlightDirective {}`,
    },
    {
      name: 'Use directive',
      description: 'Attach the directive to an element that already exists.',
      syntax: `<article [appStatusHighlight]="status()">
  Payment gateway
</article>`,
    },
    {
      name: 'Read input',
      description:
        'The directive reacts to the value provided by the host template.',
      syntax: `readonly appStatusHighlight = input<Status>('healthy');`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-01-attribute-directives',
  imports: [DirectiveLessonPage, StatusHighlightDemo],
  templateUrl: './lesson-01-attribute-directives.html',
  styleUrl: './lesson-01-attribute-directives.css',
})
export class DirectiveLesson01AttributeDirectives {
  protected readonly lesson = directiveLesson01;
}

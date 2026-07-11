import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { CompositionDemo } from './composition-demo';

export const directiveLesson05 = {
  number: 5,
  route: 'lesson-05-directive-composition',
  title: 'Directive Composition',
  intro:
    'Directive composition lets a component include host directive behavior without repeating those directives in every template usage.',
  keyPoints: [
    '`hostDirectives` composes behavior onto the component host.',
    'It is useful for shared accessibility, focus, pressed, analytics, or permission behavior.',
    'Use it when the behavior belongs to a component API, not every caller template.',
  ],
  mentalModel: `component host
  receives directive behavior

caller uses component
  component carries behavior
  template stays clean`,
  demo: {
    title: 'Composed button behavior',
    before: 'Every caller would need to remember focus and pressed directives.',
    after: 'The reusable button component includes those host behaviors.',
    actionLabel: 'Run composition demo',
  },
  codeSteps: [
    {
      name: 'Create small directives',
      description: 'Each directive owns one behavior.',
      syntax: `@Directive({ selector: '[appFocusRing]' })
export class FocusRingDirective {}`,
    },
    {
      name: 'Compose them',
      description: 'A component can opt into those host behaviors.',
      syntax: `@Component({
  hostDirectives: [FocusRingDirective],
})
export class ActionButton {}`,
    },
    {
      name: 'Use component normally',
      description:
        'Callers use the component without attaching every directive.',
      syntax: `<app-action-button>Save</app-action-button>`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-05-directive-composition',
  imports: [DirectiveLessonPage, CompositionDemo],
  templateUrl: './lesson-05-directive-composition.html',
  styleUrl: './lesson-05-directive-composition.css',
})
export class DirectiveLesson05DirectiveComposition {
  protected readonly lesson = directiveLesson05;
}

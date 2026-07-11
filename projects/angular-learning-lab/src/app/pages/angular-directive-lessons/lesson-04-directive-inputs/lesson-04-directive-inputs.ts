import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { ToneInputDemo } from './tone-input-demo';

export const directiveLesson04 = {
  number: 4,
  route: 'lesson-04-directive-inputs',
  title: 'Directive Inputs',
  intro:
    'Directive inputs let each host element configure the same directive behavior with different values.',
  keyPoints: [
    'The input with the same name as the selector receives the primary binding value.',
    'Additional inputs can configure mode, size, threshold, permissions, or options.',
    'Keep directive inputs small enough that the directive remains understandable.',
  ],
  mentalModel: `same directive class
  many host elements

each host passes inputs
  directive behavior changes
  host markup stays simple`,
  demo: {
    title: 'Tone and density inputs',
    before: 'The host element has no reusable visual behavior.',
    after: 'The directive applies a configured tone and density.',
    actionLabel: 'Run directive input demo',
  },
  codeSteps: [
    {
      name: 'Primary input',
      description:
        'An input named like the selector receives `[appTonePanel]`.',
      syntax: `readonly appTonePanel = input<Tone>('info');`,
    },
    {
      name: 'Secondary input',
      description: 'Additional inputs configure the same directive instance.',
      syntax: `readonly toneSize = input<ToneSize>('comfortable');`,
    },
    {
      name: 'Template usage',
      description:
        'The host element can pass several values into one directive.',
      syntax: `<article
  [appTonePanel]="tone()"
  [toneSize]="toneSize()">
</article>`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-04-directive-inputs',
  imports: [DirectiveLessonPage, ToneInputDemo],
  templateUrl: './lesson-04-directive-inputs.html',
  styleUrl: './lesson-04-directive-inputs.css',
})
export class DirectiveLesson04DirectiveInputs {
  protected readonly lesson = directiveLesson04;
}

import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { BuiltInPipesDemo } from './built-in-pipes-demo';

export const pipeLesson01 = {
  number: 1,
  route: 'lesson-01-built-in-pipes',
  title: 'Built-in Pipes',
  intro:
    'Angular built-in pipes handle common display formatting such as dates, currency, percentages, numbers, casing, JSON, and async values.',
  keyPoints: [
    'Built-in pipes are template display helpers.',
    'They format the rendered value without changing your source data.',
    'Use them for common formatting before creating custom pipes.',
  ],
  mentalModel: `source value
  stays unchanged

template pipe
  formats for display

user sees
  readable value`,
  demo: {
    title: 'Common formatting',
    before: 'Raw data is useful for code but not always friendly on screen.',
    after:
      'Built-in pipes format values for users without mutating source state.',
    actionLabel: 'Run built-in pipes demo',
  },
  codeSteps: [
    {
      name: 'Currency',
      description: 'Format a number as money.',
      syntax: `{{ "{{ total | currency: 'USD' }}" }}`,
    },
    {
      name: 'Date',
      description: 'Format Date values for display.',
      syntax: `{{ "{{ shippedAt | date: 'medium' }}" }}`,
    },
    {
      name: 'Text',
      description: 'Format casing for template text.',
      syntax: `{{ "{{ title | titlecase }}" }}`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-01-built-in-pipes',
  imports: [PipeLessonPage, BuiltInPipesDemo],
  templateUrl: './lesson-01-built-in-pipes.html',
  styleUrl: './lesson-01-built-in-pipes.css',
})
export class PipeLesson01BuiltInPipes {
  protected readonly lesson = pipeLesson01;
}

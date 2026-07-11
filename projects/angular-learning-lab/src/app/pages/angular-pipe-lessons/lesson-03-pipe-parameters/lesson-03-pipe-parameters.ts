import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { TruncateDemo } from './truncate-demo';

export const pipeLesson03 = {
  number: 3,
  route: 'lesson-03-pipe-parameters',
  title: 'Pipe Parameters',
  intro:
    'Pipe parameters configure how a pipe transforms the value on its left side.',
  keyPoints: [
    'The value before `|` becomes the first transform argument.',
    'Values after `:` become additional transform arguments.',
    'Use parameters for formatting options, not hidden state.',
  ],
  mentalModel: `left value
  pipe receives first

colon parameters
  become extra arguments

pipe returns
  configured display value`,
  demo: {
    title: 'Truncate text with options',
    before: 'Long API text can crowd a card.',
    after: 'A parameterized pipe controls length and suffix style.',
    actionLabel: 'Run parameter pipe demo',
  },
  codeSteps: [
    {
      name: 'Transform signature',
      description: 'Pipe parameters become normal method parameters.',
      syntax: `transform(value: string, maxLength: number, mode = 'ellipsis')`,
    },
    {
      name: 'Template usage',
      description: 'Separate pipe parameters with colons.',
      syntax: `{{ releaseNote | truncateText: maxLength : mode }}`,
    },
    {
      name: 'Keep it simple',
      description:
        'If a pipe needs many parameters, a view model may be clearer.',
      syntax: `displayNote = computed(() =>
  buildNotePreview(note(), options()),
);`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-03-pipe-parameters',
  imports: [PipeLessonPage, TruncateDemo],
  templateUrl: './lesson-03-pipe-parameters.html',
  styleUrl: './lesson-03-pipe-parameters.css',
})
export class PipeLesson03PipeParameters {
  protected readonly lesson = pipeLesson03;
}

import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { PureImpureDemo } from './pure-impure-demo';

export const pipeLesson04 = {
  number: 4,
  route: 'lesson-04-pure-vs-impure-pipes',
  title: 'Pure Vs Impure Pipes',
  intro:
    'Pure pipes are cache-friendly and run when inputs change by value or reference. Impure pipes run much more often and should be rare.',
  keyPoints: [
    'Pure pipes are the default and are usually what you want.',
    'Pure pipes do not rerun for in-place object or array mutation.',
    'Impure pipes can notice internal mutation, but they run often and can hurt performance.',
  ],
  mentalModel: `pure pipe
  input reference changes
  transform runs

same object mutated
  pure pipe may not run

impure pipe
  checks often
  use carefully`,
  demo: {
    title: 'Mutation vs new reference',
    before: 'Both pipes read the same item array.',
    after:
      'Pure pipes reward immutable updates; impure pipes trade correctness for cost.',
    actionLabel: 'Run pure pipe demo',
  },
  codeSteps: [
    {
      name: 'Pure pipe',
      description: 'Pure is the default.',
      syntax: `@Pipe({ name: 'itemSummary' })
export class ItemSummaryPipe implements PipeTransform {}`,
    },
    {
      name: 'Impure pipe',
      description: 'Opt into impure behavior only when needed.',
      syntax: `@Pipe({
  name: 'liveSummary',
  pure: false,
})`,
    },
    {
      name: 'Immutable input',
      description: 'Replacing the array gives a pure pipe a new reference.',
      syntax: `this.items = [...this.items, newItem];`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-04-pure-vs-impure-pipes',
  imports: [PipeLessonPage, PureImpureDemo],
  templateUrl: './lesson-04-pure-vs-impure-pipes.html',
  styleUrl: './lesson-04-pure-vs-impure-pipes.css',
})
export class PipeLesson04PureVsImpurePipes {
  protected readonly lesson = pipeLesson04;
}

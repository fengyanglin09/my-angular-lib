import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { PipeChoiceDemo } from './choice-demo';

export const pipeLesson08 = {
  number: 8,
  route: 'lesson-08-pipe-vs-computed-signal-method',
  title: 'Pipe Vs Computed, Signal, Or Method',
  intro:
    'Pipes are excellent for display formatting. Computed signals are better for reusable derived state. Methods are usually best for commands or event-time calculations.',
  keyPoints: [
    'Use a pipe when a template value only needs display formatting.',
    'Use computed state when derived data is reused or meaningful to the component.',
    'Avoid template methods for heavy or repeated derivation.',
  ],
  mentalModel: `pipe
  display formatting

computed
  reusable derived state

signal
  source state

method
  command or event-time work`,
  demo: {
    title: 'Choose transformation ownership',
    before: 'A subtotal could be calculated or formatted in several places.',
    after: 'Computed owns derived state; pipe owns display formatting.',
    actionLabel: 'Run pipe choice demo',
  },
  codeSteps: [
    {
      name: 'Pipe',
      description: 'Best for template-only display formatting.',
      syntax: `{{ subtotal() | currency: 'USD' }}`,
    },
    {
      name: 'Computed',
      description: 'Best for reusable derived state.',
      syntax: `subtotal = computed(() =>
  quantity() * unitPrice(),
);`,
    },
    {
      name: 'Method',
      description: 'Best for commands, event handlers, or rare calculations.',
      syntax: `saveOrder(): void {
  const subtotal = this.quantity() * this.unitPrice();
}`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-08-pipe-vs-computed-signal-method',
  imports: [PipeLessonPage, PipeChoiceDemo],
  templateUrl: './lesson-08-pipe-vs-computed-signal-method.html',
  styleUrl: './lesson-08-pipe-vs-computed-signal-method.css',
})
export class PipeLesson08PipeVsComputedSignalMethod {
  protected readonly lesson = pipeLesson08;
}

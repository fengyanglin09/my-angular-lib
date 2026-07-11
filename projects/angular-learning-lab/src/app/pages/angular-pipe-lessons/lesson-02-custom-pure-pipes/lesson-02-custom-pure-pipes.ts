import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { StatusLabelDemo } from './status-label-demo';

export const pipeLesson02 = {
  number: 2,
  route: 'lesson-02-custom-pure-pipes',
  title: 'Custom Pure Pipes',
  intro:
    'A custom pure pipe turns one input value into a display value. Pure pipes are the default and rerun only when input references change.',
  keyPoints: [
    'Use a custom pipe for reusable display transformation.',
    'Keep pure pipes side-effect free.',
    'A pipe should not fetch data or mutate application state.',
  ],
  mentalModel: `input value
  enters transform

pure pipe
  returns display value
  no side effects

template renders result`,
  demo: {
    title: 'Status label pipe',
    before: 'The template shows backend-style status codes.',
    after: 'The pipe maps status codes to friendly labels.',
    actionLabel: 'Run custom pipe demo',
  },
  codeSteps: [
    {
      name: 'Create pipe',
      description: 'A pipe class implements `PipeTransform`.',
      syntax: `@Pipe({ name: 'statusLabel' })
export class StatusLabelPipe implements PipeTransform {}`,
    },
    {
      name: 'Transform value',
      description:
        'Transform receives the input value and returns display text.',
      syntax: `transform(status: TicketStatus): string {
  return statusLabels[status] ?? 'Unknown';
}`,
    },
    {
      name: 'Use pipe',
      description: 'Templates pass the left-side value into the pipe.',
      syntax: `{{ "{{ ticket.status | statusLabel }}" }}`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-02-custom-pure-pipes',
  imports: [PipeLessonPage, StatusLabelDemo],
  templateUrl: './lesson-02-custom-pure-pipes.html',
  styleUrl: './lesson-02-custom-pure-pipes.css',
})
export class PipeLesson02CustomPurePipes {
  protected readonly lesson = pipeLesson02;
}

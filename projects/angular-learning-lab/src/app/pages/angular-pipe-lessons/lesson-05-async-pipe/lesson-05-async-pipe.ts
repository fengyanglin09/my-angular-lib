import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { AsyncPipeDemo } from './async-pipe-demo';

export const pipeLesson05 = {
  number: 5,
  route: 'lesson-05-async-pipe',
  title: 'Async Pipe',
  intro:
    'The async pipe subscribes to an Observable or Promise in the template, renders the latest value, and unsubscribes when the view is destroyed.',
  keyPoints: [
    'Use async pipe for template-owned subscriptions.',
    'It handles unsubscribe for you when the view goes away.',
    'Keep backend flow and transformation logic in TypeScript; let async pipe render the latest value.',
  ],
  mentalModel: `Observable emits
  async pipe subscribes
  template receives latest value

view destroyed
  async pipe unsubscribes`,
  demo: {
    title: 'Observable profile state',
    before: 'A component would otherwise need manual subscribe and cleanup.',
    after: 'The template reads the latest Observable value through async pipe.',
    actionLabel: 'Run async pipe demo',
  },
  codeSteps: [
    {
      name: 'Template subscription',
      description: 'Async pipe unwraps the latest emitted value.',
      syntax: `@if (profileState$ | async; as state) {
  {{ state.loading }}
}`,
    },
    {
      name: 'Automatic cleanup',
      description:
        'Angular unsubscribes when the view using async pipe is destroyed.',
      syntax: `profileState$ | async`,
    },
    {
      name: 'Good boundary',
      description:
        'Build the Observable in TypeScript; unwrap it in the template.',
      syntax: `readonly vm$ = reload$.pipe(
  switchMap(() => api.loadProfile()),
);`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-05-async-pipe',
  imports: [PipeLessonPage, AsyncPipeDemo],
  templateUrl: './lesson-05-async-pipe.html',
  styleUrl: './lesson-05-async-pipe.css',
})
export class PipeLesson05AsyncPipe {
  protected readonly lesson = pipeLesson05;
}

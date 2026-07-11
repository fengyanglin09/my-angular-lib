import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { ApiFormattingDemo } from './api-formatting-demo';

export const pipeLesson06 = {
  number: 6,
  route: 'lesson-06-formatting-api-data',
  title: 'Formatting API Data For Display',
  intro:
    'Pipes are useful at the boundary between backend-shaped values and human-readable UI display.',
  keyPoints: [
    'Keep raw API data and display formatting separate.',
    'Use built-in pipes for currency and date formatting.',
    'Use custom pipes for reusable display labels, not domain decisions.',
  ],
  mentalModel: `API DTO
  raw transport shape

component/template
  chooses display

pipes
  format values for users`,
  demo: {
    title: 'Invoice DTO formatting',
    before: 'The API DTO has cents, ISO dates, and uppercase status codes.',
    after:
      'The UI displays currency, readable dates, and friendly status labels.',
    actionLabel: 'Run API formatting demo',
  },
  codeSteps: [
    {
      name: 'Currency from cents',
      description:
        'Convert units in TypeScript, then format display with currency pipe.',
      syntax: `{{ amountInDollars(invoice) | currency: 'USD' }}`,
    },
    {
      name: 'Date display',
      description: 'Use DatePipe to render ISO date strings for users.',
      syntax: `{{ invoice.due_date_iso | date: 'mediumDate' }}`,
    },
    {
      name: 'Status label',
      description: 'A custom pure pipe can convert API enum codes into labels.',
      syntax: `{{ invoice.invoice_status | invoiceStatusLabel }}`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-06-formatting-api-data',
  imports: [PipeLessonPage, ApiFormattingDemo],
  templateUrl: './lesson-06-formatting-api-data.html',
  styleUrl: './lesson-06-formatting-api-data.css',
})
export class PipeLesson06FormattingApiData {
  protected readonly lesson = pipeLesson06;
}

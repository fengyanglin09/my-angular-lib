import { Component, signal } from '@angular/core';
import { from, filter, map, tap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface OperatorStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-03-pipeable-operators',
  imports: [LearningNav],
  templateUrl: './lesson-03-pipeable-operators.html',
  styleUrl: './lesson-03-pipeable-operators.css',
})
export class Lesson03PipeableOperators {
  protected readonly inputValues = [1, 2, 3, 4, 5];
  protected readonly logs = signal<string[]>([
    'Click Run pipeline to send values through tap, filter, and map.',
  ]);
  protected readonly outputValues = signal<string[]>([]);

  protected readonly steps: OperatorStep[] = [
    {
      description: 'Looks at each value without changing it.',
      name: 'tap',
      syntax: 'tap((value) => log(value))',
    },
    {
      description: 'Allows only values that pass a condition.',
      name: 'filter',
      syntax: 'filter((value) => value % 2 === 0)',
    },
    {
      description: 'Transforms each value into a new value.',
      name: 'map',
      syntax: "map((value) => `Item ${value * 10}`)",
    },
  ];

  protected runPipeline(): void {
    this.logs.set(['Pipeline started with values: 1, 2, 3, 4, 5.']);
    this.outputValues.set([]);

    from(this.inputValues)
      .pipe(
        tap((value) => this.addLog(`tap before filter saw ${value}.`)),
        filter((value) => {
          const keep = value % 2 === 0;
          this.addLog(
            `filter checked ${value}: ${keep ? 'kept' : 'removed'}.`,
          );

          return keep;
        }),
        map((value) => {
          const mappedValue = `Item ${value * 10}`;
          this.addLog(`map changed ${value} into "${mappedValue}".`);

          return mappedValue;
        }),
        tap((value) => this.addLog(`tap after map saw "${value}".`)),
      )
      .subscribe({
        complete: () => this.addLog('Pipeline completed.'),
        next: (value) => {
          this.outputValues.update((values) => [...values, value]);
          this.addLog(`subscriber received "${value}".`);
        },
      });
  }

  protected reset(): void {
    this.logs.set([
      'Click Run pipeline to send values through tap, filter, and map.',
    ]);
    this.outputValues.set([]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}


import { Component, signal } from '@angular/core';
import { filter, from, map } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface MarbleScenario {
  description: string;
  name: string;
  operator: string;
  source: string;
}

interface MarbleResult {
  logs: string[];
  output: string;
  source: string;
}

@Component({
  selector: 'app-lesson-13-marble-thinking',
  imports: [LearningNav],
  templateUrl: './lesson-13-marble-thinking.html',
  styleUrl: './lesson-13-marble-thinking.css',
})
export class Lesson13MarbleThinking {
  protected readonly activeScenario = signal('None');
  protected readonly result = signal<MarbleResult>({
    logs: ['Choose a scenario to translate stream behavior into a timeline.'],
    output: '------',
    source: '------',
  });

  protected readonly scenarios: MarbleScenario[] = [
    {
      description: 'Each value stays in the same time slot, but the value changes.',
      name: 'Map values',
      operator: 'map((value) => value.toUpperCase())',
      source: '--a--b--c--|',
    },
    {
      description: 'Some values disappear, but the surviving values keep their timing.',
      name: 'Filter values',
      operator: 'filter((value) => value % 2 === 0)',
      source: '--1--2--3--4--|',
    },
    {
      description: 'A newer outer value cancels older inner work before it can finish.',
      name: 'Switch to latest',
      operator: 'switchMap((query) => search(query))',
      source: '--a---b------|',
    },
  ];

  protected runFilterScenario(): void {
    const logs: string[] = ['Source timeline: --1--2--3--4--|'];

    from([1, 2, 3, 4])
      .pipe(
        filter((value) => {
          const keep = value % 2 === 0;

          logs.push(`${value} was ${keep ? 'kept' : 'removed'}.`);
          return keep;
        }),
      )
      .subscribe((value) => logs.push(`${value} appears in the output timeline.`));

    this.activeScenario.set('Filter values');
    this.result.set({
      logs,
      output: '-----2-----4--|',
      source: '--1--2--3--4--|',
    });
  }

  protected runMapScenario(): void {
    const logs: string[] = ['Source timeline: --a--b--c--|'];
    const output: string[] = [];

    from(['a', 'b', 'c'])
      .pipe(
        map((value) => {
          const mappedValue = value.toUpperCase();

          logs.push(`${value} became ${mappedValue}.`);
          return mappedValue;
        }),
      )
      .subscribe((value) => output.push(String(value)));

    this.activeScenario.set('Map values');
    this.result.set({
      logs,
      output: `--${output[0]}--${output[1]}--${output[2]}--|`,
      source: '--a--b--c--|',
    });
  }

  protected runSwitchMapScenario(): void {
    const logs: string[] = [
      'Source timeline: --a---b------|',
      'a starts a slow inner search.',
      'b arrives before a finishes, so switchMap cancels a.',
    ];

    this.activeScenario.set('Switch to latest');
    this.result.set({
      logs: [
        ...logs,
        'Subscriber receives B result.',
        'Only b appears in the final marble because b was latest.',
      ],
      output: '--------B--|',
      source: '--a---b------|',
    });
  }

  protected reset(): void {
    this.activeScenario.set('None');
    this.result.set({
      logs: ['Choose a scenario to translate stream behavior into a timeline.'],
      output: '------',
      source: '------',
    });
  }
}

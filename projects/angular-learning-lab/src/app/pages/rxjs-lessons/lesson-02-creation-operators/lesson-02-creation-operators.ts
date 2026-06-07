import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription, from, interval, of, take, timer } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface OperatorCard {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-02-creation-operators',
  imports: [LearningNav],
  templateUrl: './lesson-02-creation-operators.html',
  styleUrl: './lesson-02-creation-operators.css',
})
export class Lesson02CreationOperators implements OnDestroy {
  private activeSubscription: Subscription | null = null;

  protected readonly activeDemo = signal('None');
  protected readonly logs = signal<string[]>([
    'Choose a creation operator to see what it emits.',
  ]);

  protected readonly operators: OperatorCard[] = [
    {
      description: 'Emits the values you pass to it, then completes.',
      name: 'of',
      syntax: "of('A', 'B', 'C')",
    },
    {
      description: 'Turns an array, promise, or iterable into an Observable.',
      name: 'from',
      syntax: "from(['A', 'B', 'C'])",
    },
    {
      description: 'Emits numbers forever on a schedule until you unsubscribe or limit it.',
      name: 'interval',
      syntax: 'interval(700).pipe(take(4))',
    },
    {
      description: 'Waits, then emits once and completes.',
      name: 'timer',
      syntax: 'timer(1000)',
    },
  ];

  ngOnDestroy(): void {
    this.stopDemo();
  }

  protected runFromDemo(): void {
    this.startDemo('from');

    this.activeSubscription = from(['Angular', 'RxJS', 'NgRx']).subscribe({
      complete: () => this.addLog('from completed after the array was exhausted.'),
      next: (value) => this.addLog(`from emitted "${value}".`),
    });
  }

  protected runIntervalDemo(): void {
    this.startDemo('interval');

    this.activeSubscription = interval(700)
      .pipe(take(4))
      .subscribe({
        complete: () => this.addLog('interval completed because take(4) stopped it.'),
        next: (value) => this.addLog(`interval emitted ${value}.`),
      });
  }

  protected runOfDemo(): void {
    this.startDemo('of');

    this.activeSubscription = of('Angular', 'RxJS', 'NgRx').subscribe({
      complete: () => this.addLog('of completed after emitting its listed values.'),
      next: (value) => this.addLog(`of emitted "${value}".`),
    });
  }

  protected runTimerDemo(): void {
    this.startDemo('timer');

    this.activeSubscription = timer(1000).subscribe({
      complete: () => this.addLog('timer completed after one emission.'),
      next: (value) => this.addLog(`timer emitted ${value} after 1 second.`),
    });
  }

  protected stopDemo(): void {
    if (!this.activeSubscription) {
      return;
    }

    this.activeSubscription.unsubscribe();
    this.activeSubscription = null;
    this.addLog('Subscription stopped.');
    this.activeDemo.set('None');
  }

  private startDemo(name: string): void {
    this.stopDemo();
    this.activeDemo.set(name);
    this.logs.set([`Starting ${name} demo.`]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}


import { Component, OnDestroy, signal } from '@angular/core';
import { pairwise, startWith, Subject, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface ChangeLog {
  direction: 'down' | 'same' | 'up';
  label: string;
  next: number;
  previous: number;
}

@Component({
  selector: 'app-lesson-15-pairwise-changes',
  imports: [LearningNav],
  templateUrl: './lesson-15-pairwise-changes.html',
  styleUrl: './lesson-15-pairwise-changes.css',
})
export class Lesson15PairwiseChanges implements OnDestroy {
  private readonly scoreChanges$ = new Subject<number>();
  private readonly subscription: Subscription;

  protected readonly currentScore = signal(72);
  protected readonly logs = signal<ChangeLog[]>([]);

  protected readonly examples = [
    {
      description: 'Compare route param A to route param B before reloading data.',
      name: 'Route changes',
      syntax: 'routeParam$.pipe(pairwise())',
    },
    {
      description: 'Show whether a metric is moving up, down, or staying the same.',
      name: 'Metric trends',
      syntax: 'score$.pipe(startWith(initial), pairwise())',
    },
    {
      description: 'Detect a meaningful transition, such as dirty -> saved.',
      name: 'Status transitions',
      syntax: 'status$.pipe(pairwise())',
    },
  ];

  constructor() {
    this.subscription = this.scoreChanges$
      .pipe(
        startWith(this.currentScore()),
        pairwise(),
      )
      .subscribe(([previous, next]) => {
        this.currentScore.set(next);
        this.logs.update((logs) => [
          this.createLog(previous, next),
          ...logs,
        ]);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected setScore(score: number): void {
    this.scoreChanges$.next(score);
  }

  protected reset(): void {
    this.currentScore.set(72);
    this.logs.set([]);
  }

  private createLog(previous: number, next: number): ChangeLog {
    const difference = next - previous;
    const direction = difference > 0 ? 'up' : difference < 0 ? 'down' : 'same';
    const label =
      direction === 'same'
        ? `Stayed at ${next}`
        : `${previous} -> ${next} (${difference > 0 ? '+' : ''}${difference})`;

    return {
      direction,
      label,
      next,
      previous,
    };
  }
}

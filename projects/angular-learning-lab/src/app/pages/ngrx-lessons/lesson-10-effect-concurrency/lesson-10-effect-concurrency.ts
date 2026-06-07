import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { ConcurrencyActions } from '../../../state/concurrency/concurrency.actions';
import { ConcurrencyStrategy } from '../../../state/concurrency/concurrency.models';
import {
  selectLogsByStrategy,
  selectNextRequestId,
} from '../../../state/concurrency/concurrency.selectors';

interface StrategyExample {
  name: ConcurrencyStrategy;
  title: string;
  summary: string;
  usage: string;
}

@Component({
  selector: 'app-lesson-10-effect-concurrency',
  imports: [LearningNav],
  templateUrl: './lesson-10-effect-concurrency.html',
  styleUrl: './lesson-10-effect-concurrency.css',
})
export class Lesson10EffectConcurrency {
  private readonly store = inject(Store);

  protected readonly logsByStrategy = this.store.selectSignal(selectLogsByStrategy);
  protected readonly nextRequestId = this.store.selectSignal(selectNextRequestId);

  protected readonly strategies: StrategyExample[] = [
    {
      name: 'switchMap',
      title: 'switchMap',
      summary: 'Cancel the older request and keep the newest one.',
      usage: 'Best for search, filters, route-driven loads, and typeahead.',
    },
    {
      name: 'concatMap',
      title: 'concatMap',
      summary: 'Queue requests and run them one at a time.',
      usage: 'Best when order matters, like saving drafts or audit events.',
    },
    {
      name: 'mergeMap',
      title: 'mergeMap',
      summary: 'Run requests at the same time.',
      usage: 'Best for independent operations that can finish in any order.',
    },
    {
      name: 'exhaustMap',
      title: 'exhaustMap',
      summary: 'Ignore new requests while one is already running.',
      usage: 'Best for submit buttons, login, checkout, or refresh actions.',
    },
  ];

  protected clearLogs(): void {
    this.store.dispatch(ConcurrencyActions.clearLogs());
  }

  protected runOne(strategy: ConcurrencyStrategy): void {
    this.dispatchRequest(strategy, this.nextRequestId());
  }

  protected runThree(strategy: ConcurrencyStrategy): void {
    const firstId = this.nextRequestId();

    for (let offset = 0; offset < 3; offset += 1) {
      this.dispatchRequest(strategy, firstId + offset);
    }
  }

  private dispatchRequest(strategy: ConcurrencyStrategy, id: number): void {
    this.store.dispatch(ConcurrencyActions.runRequest({ strategy, id }));
  }
}

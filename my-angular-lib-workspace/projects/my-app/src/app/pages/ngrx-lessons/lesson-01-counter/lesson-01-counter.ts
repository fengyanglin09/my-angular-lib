import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { CounterActions } from '../../../state/counter/counter.actions';
import { selectCount, selectCountLabel } from '../../../state/counter/counter.selectors';

@Component({
  selector: 'app-lesson-01-counter',
  templateUrl: './lesson-01-counter.html',
  styleUrl: './lesson-01-counter.css',
})
export class Lesson01Counter {
  private readonly store = inject(Store);

  protected readonly count = this.store.selectSignal(selectCount);
  protected readonly countLabel = this.store.selectSignal(selectCountLabel);

  protected increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  protected decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  protected reset(): void {
    this.store.dispatch(CounterActions.reset());
  }
}

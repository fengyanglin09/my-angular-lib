import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { DevtoolsLabActions } from '../../../state/devtools-lab/devtools-lab.actions';
import {
  selectAuditTrail,
  selectCount,
  selectDevtoolsLabSummary,
  selectError,
  selectLabel,
  selectLoading,
} from '../../../state/devtools-lab/devtools-lab.selectors';

@Component({
  selector: 'app-lesson-21-store-devtools',
  imports: [LearningNav],
  templateUrl: './lesson-21-store-devtools.html',
  styleUrl: './lesson-21-store-devtools.css',
})
export class Lesson21StoreDevtools {
  private readonly labels = [
    'Ready to inspect',
    'Reducer updated count',
    'Effect request in flight',
    'State diff is visible',
  ];
  private readonly store = inject(Store);

  protected readonly auditTrail = this.store.selectSignal(selectAuditTrail);
  protected readonly count = this.store.selectSignal(selectCount);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly label = this.store.selectSignal(selectLabel);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly summary = this.store.selectSignal(selectDevtoolsLabSummary);

  protected increment(): void {
    this.store.dispatch(DevtoolsLabActions.incrementCounter());
  }

  protected loadAuditTrail(shouldFail = false): void {
    this.store.dispatch(DevtoolsLabActions.loadAuditTrail({ shouldFail }));
  }

  protected reset(): void {
    this.store.dispatch(DevtoolsLabActions.resetLab());
  }

  protected setNextLabel(): void {
    const currentIndex = this.labels.indexOf(this.label());
    const nextIndex = (currentIndex + 1) % this.labels.length;

    this.store.dispatch(
      DevtoolsLabActions.setLabel({ label: this.labels[nextIndex] }),
    );
  }
}


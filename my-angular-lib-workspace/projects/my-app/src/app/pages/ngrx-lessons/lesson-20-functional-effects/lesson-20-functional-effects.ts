import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { FunctionalTipsActions } from '../../../state/functional-tips/functional-tips.actions';
import { FunctionalTipsNotifications } from '../../../state/functional-tips/functional-tips-notifications';
import {
  selectError,
  selectFunctionalTipsSummary,
  selectLoading,
  selectTips,
} from '../../../state/functional-tips/functional-tips.selectors';

@Component({
  selector: 'app-lesson-20-functional-effects',
  imports: [LearningNav],
  templateUrl: './lesson-20-functional-effects.html',
  styleUrl: './lesson-20-functional-effects.css',
})
export class Lesson20FunctionalEffects implements OnInit {
  private readonly notificationsService = inject(FunctionalTipsNotifications);
  private readonly store = inject(Store);

  protected readonly error = this.store.selectSignal(selectError);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly notifications = this.notificationsService.notifications;
  protected readonly summary = this.store.selectSignal(selectFunctionalTipsSummary);
  protected readonly tips = this.store.selectSignal(selectTips);

  ngOnInit(): void {
    this.notificationsService.clear();
    this.loadTips();
  }

  protected clearNotifications(): void {
    this.notificationsService.clear();
  }

  protected loadTips(shouldFail = false): void {
    this.store.dispatch(FunctionalTipsActions.loadTips({ shouldFail }));
  }
}

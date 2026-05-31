import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { FeedbackActions } from '../../../state/feedback/feedback.actions';
import { FeedbackItem } from '../../../state/feedback/feedback.models';
import {
  selectAllFeedback,
  selectError,
  selectFeedbackSummary,
  selectLoading,
} from '../../../state/feedback/feedback.selectors';

@Component({
  selector: 'app-lesson-08-optimistic-updates',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-08-optimistic-updates.html',
  styleUrl: './lesson-08-optimistic-updates.css',
})
export class Lesson08OptimisticUpdates implements OnInit {
  private readonly store = inject(Store);

  protected readonly error = this.store.selectSignal(selectError);
  protected readonly feedback = this.store.selectSignal(selectAllFeedback);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly summary = this.store.selectSignal(selectFeedbackSummary);
  protected newFeedback = '';

  ngOnInit(): void {
    this.store.dispatch(FeedbackActions.loadFeedback());
  }

  protected addFeedback(shouldFail = false): void {
    const text = this.newFeedback.trim();

    if (!text) {
      return;
    }

    this.store.dispatch(
      FeedbackActions.addFeedback({
        tempId: -Date.now(),
        text,
        shouldFail,
      }),
    );
    this.newFeedback = '';
  }

  protected deleteFeedback(feedback: FeedbackItem, shouldFail = false): void {
    this.store.dispatch(FeedbackActions.deleteFeedback({ feedback, shouldFail }));
  }

  protected toggleLike(feedback: FeedbackItem, shouldFail = false): void {
    this.store.dispatch(
      FeedbackActions.toggleLike({
        id: feedback.id,
        liked: !feedback.liked,
        shouldFail,
      }),
    );
  }
}

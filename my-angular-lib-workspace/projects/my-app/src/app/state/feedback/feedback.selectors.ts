import { createSelector } from '@ngrx/store';

import { feedbackAdapter, feedbackFeature } from './feedback.reducer';

export const { selectFeedbackState, selectError, selectLoading, selectPendingIds } = feedbackFeature;

const adapterSelectors = feedbackAdapter.getSelectors();

export const selectAllFeedback = createSelector(
  selectFeedbackState,
  adapterSelectors.selectAll,
);

export const selectLikedFeedbackCount = createSelector(
  selectAllFeedback,
  (feedback) => feedback.filter((item) => item.liked).length,
);

export const selectFeedbackSummary = createSelector(
  selectAllFeedback,
  selectLikedFeedbackCount,
  selectPendingIds,
  (feedback, likedCount, pendingIds) =>
    `${feedback.length} comments, ${likedCount} liked, ${pendingIds.length} pending`,
);

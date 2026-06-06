import { createSelector } from '@ngrx/store';

import { functionalTipsFeature } from './functional-tips.reducer';

export const {
  selectError,
  selectFunctionalTipsState,
  selectLoading,
  selectTips,
} = functionalTipsFeature;

export const selectFunctionalTipsSummary = createSelector(
  selectTips,
  selectLoading,
  (tips, loading) => `${tips.length} functional tips${loading ? ', loading...' : ''}`,
);

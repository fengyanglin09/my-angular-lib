import { createSelector } from '@ngrx/store';

import { counterFeature } from './counter.reducer';

export const { selectCounterState, selectCount } = counterFeature;

export const selectCountLabel = createSelector(
  selectCount,
  (count) => `Current count: ${count}`,
);

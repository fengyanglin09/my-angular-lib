import { createSelector } from '@ngrx/store';

import {
  lessonProgressAdapter,
  lessonProgressFeature,
} from './lesson-progress.reducer';

export const {
  selectError,
  selectLessonProgressState,
  selectLoaded,
  selectLoading,
} = lessonProgressFeature;

const adapterSelectors = lessonProgressAdapter.getSelectors();

export const selectAllProgressItems = createSelector(
  selectLessonProgressState,
  adapterSelectors.selectAll,
);

export const selectCompletedProgressItems = createSelector(
  selectAllProgressItems,
  (items) => items.filter((item) => item.complete),
);

export const selectProgressSummary = createSelector(
  selectAllProgressItems,
  selectCompletedProgressItems,
  (items, completedItems) => `${completedItems.length} of ${items.length} complete`,
);

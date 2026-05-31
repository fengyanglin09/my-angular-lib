import { createSelector } from '@ngrx/store';

import { draftsAdapter, draftsFeature } from './drafts.reducer';

export const {
  selectDraftsState,
  selectCreating,
  selectError,
  selectLoading,
  selectUpdatingIds,
} = draftsFeature;

const adapterSelectors = draftsAdapter.getSelectors();

export const selectAllDrafts = createSelector(
  selectDraftsState,
  adapterSelectors.selectAll,
);

export const selectDraftsSummary = createSelector(
  selectAllDrafts,
  selectCreating,
  selectUpdatingIds,
  (drafts, creating, updatingIds) => {
    const pendingMessages = [
      creating ? 'creating...' : '',
      updatingIds.length > 0 ? `${updatingIds.length} updating...` : '',
    ].filter(Boolean);

    return [
      `${drafts.length} saved drafts`,
      ...pendingMessages,
    ].join(', ');
  },
);

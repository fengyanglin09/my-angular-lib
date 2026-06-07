import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { DraftsActions } from './drafts.actions';
import { DraftIdea } from './drafts.models';

export interface DraftsState extends EntityState<DraftIdea> {
  creating: boolean;
  error: string | null;
  loading: boolean;
  updatingIds: number[];
}

export const draftsAdapter = createEntityAdapter<DraftIdea>({
  sortComparer: (a, b) => a.id - b.id,
});

export const initialDraftsState: DraftsState = draftsAdapter.getInitialState({
  creating: false,
  error: null,
  loading: false,
  updatingIds: [],
});

function addPending(pendingIds: number[], id: number): number[] {
  return pendingIds.includes(id) ? pendingIds : [...pendingIds, id];
}

function removePending(pendingIds: number[], id: number): number[] {
  return pendingIds.filter((pendingId) => pendingId !== id);
}

export const draftsFeature = createFeature({
  name: 'drafts',
  reducer: createReducer(
    initialDraftsState,
    on(DraftsActions.loadDrafts, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(DraftsActions.loadDraftsSuccess, (state, { drafts }) =>
      draftsAdapter.setAll(drafts, {
        ...state,
        error: null,
        loading: false,
      }),
    ),
    on(DraftsActions.loadDraftsFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(DraftsActions.createDraft, (state) => ({
      ...state,
      creating: true,
      error: null,
    })),
    on(DraftsActions.createDraftSuccess, (state, { draft }) =>
      draftsAdapter.addOne(draft, {
        ...state,
        creating: false,
      }),
    ),
    on(DraftsActions.createDraftFailure, (state, { error }) => ({
      ...state,
      creating: false,
      error,
    })),
    on(DraftsActions.updateDraftCategory, (state, { id }) => ({
      ...state,
      error: null,
      updatingIds: addPending(state.updatingIds, id),
    })),
    on(DraftsActions.updateDraftCategorySuccess, (state, { draft }) =>
      draftsAdapter.updateOne(
        {
          id: draft.id,
          changes: draft,
        },
        {
          ...state,
          updatingIds: removePending(state.updatingIds, draft.id),
        },
      ),
    ),
    on(DraftsActions.updateDraftCategoryFailure, (state, { id, error }) => ({
      ...state,
      error,
      updatingIds: removePending(state.updatingIds, id),
    })),
  ),
});

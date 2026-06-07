import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { FeedbackActions } from './feedback.actions';
import { FeedbackItem } from './feedback.models';

export interface FeedbackState extends EntityState<FeedbackItem> {
  error: string | null;
  loading: boolean;
  pendingIds: number[];
}

export const feedbackAdapter = createEntityAdapter<FeedbackItem>({
  sortComparer: (a, b) => a.id - b.id,
});

export const initialFeedbackState: FeedbackState = feedbackAdapter.getInitialState({
  error: null,
  loading: false,
  pendingIds: [],
});

const addPending = (pendingIds: number[], id: number): number[] =>
  pendingIds.includes(id) ? pendingIds : [...pendingIds, id];

const removePending = (pendingIds: number[], id: number): number[] =>
  pendingIds.filter((pendingId) => pendingId !== id);

export const feedbackFeature = createFeature({
  name: 'feedback',
  reducer: createReducer(
    initialFeedbackState,
    on(FeedbackActions.loadFeedback, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(FeedbackActions.loadFeedbackSuccess, (state, { feedback }) =>
      feedbackAdapter.setAll(feedback, {
        ...state,
        error: null,
        loading: false,
        pendingIds: [],
      }),
    ),
    on(FeedbackActions.loadFeedbackFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(FeedbackActions.addFeedback, (state, { tempId, text }) =>
      feedbackAdapter.addOne(
        {
          id: tempId,
          author: 'You',
          text,
          liked: false,
          pending: true,
        },
        {
          ...state,
          error: null,
          pendingIds: addPending(state.pendingIds, tempId),
        },
      ),
    ),
    on(FeedbackActions.addFeedbackSuccess, (state, { tempId, feedback }) => {
      const withoutTemp = feedbackAdapter.removeOne(tempId, state);

      return feedbackAdapter.addOne(feedback, {
        ...withoutTemp,
        pendingIds: removePending(withoutTemp.pendingIds, tempId),
      });
    }),
    on(FeedbackActions.addFeedbackFailure, (state, { tempId, error }) =>
      feedbackAdapter.removeOne(tempId, {
        ...state,
        error,
        pendingIds: removePending(state.pendingIds, tempId),
      }),
    ),
    on(FeedbackActions.toggleLike, (state, { id, liked }) =>
      feedbackAdapter.updateOne(
        {
          id,
          changes: {
            liked,
            pending: true,
          },
        },
        {
          ...state,
          error: null,
          pendingIds: addPending(state.pendingIds, id),
        },
      ),
    ),
    on(FeedbackActions.toggleLikeSuccess, (state, { id }) =>
      feedbackAdapter.updateOne(
        {
          id,
          changes: {
            pending: false,
          },
        },
        {
          ...state,
          pendingIds: removePending(state.pendingIds, id),
        },
      ),
    ),
    on(FeedbackActions.toggleLikeFailure, (state, { id, liked, error }) =>
      feedbackAdapter.updateOne(
        {
          id,
          changes: {
            liked: !liked,
            pending: false,
          },
        },
        {
          ...state,
          error,
          pendingIds: removePending(state.pendingIds, id),
        },
      ),
    ),
    on(FeedbackActions.deleteFeedback, (state, { feedback }) =>
      feedbackAdapter.removeOne(feedback.id, {
        ...state,
        error: null,
        pendingIds: addPending(state.pendingIds, feedback.id),
      }),
    ),
    on(FeedbackActions.deleteFeedbackSuccess, (state, { id }) => ({
      ...state,
      pendingIds: removePending(state.pendingIds, id),
    })),
    on(FeedbackActions.deleteFeedbackFailure, (state, { feedback, error }) =>
      feedbackAdapter.addOne(feedback, {
        ...state,
        error,
        pendingIds: removePending(state.pendingIds, feedback.id),
      }),
    ),
  ),
});

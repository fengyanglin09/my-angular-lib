import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LessonProgressActions } from './lesson-progress.actions';
import { LessonProgressItem } from './lesson-progress.models';

export interface LessonProgressState extends EntityState<LessonProgressItem> {
  error: string | null;
  loaded: boolean;
  loading: boolean;
}

export const lessonProgressAdapter = createEntityAdapter<LessonProgressItem>({
  sortComparer: (a, b) => a.id - b.id,
});

export const initialLessonProgressState: LessonProgressState =
  lessonProgressAdapter.getInitialState({
    error: null,
    loaded: false,
    loading: false,
  });

export const lessonProgressFeature = createFeature({
  name: 'lessonProgress',
  reducer: createReducer(
    initialLessonProgressState,
    on(LessonProgressActions.loadProgress, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(LessonProgressActions.loadProgressSuccess, (state, { progress }) =>
      lessonProgressAdapter.setAll(progress, {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      }),
    ),
    on(LessonProgressActions.loadProgressFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(LessonProgressActions.toggleProgressItem, (state, { id }) => {
      const item = state.entities[id];

      if (!item) {
        return state;
      }

      return lessonProgressAdapter.updateOne(
        {
          id,
          changes: {
            complete: !item.complete,
          },
        },
        state,
      );
    }),
  ),
});

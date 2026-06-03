import { createFeature, createReducer, on } from '@ngrx/store';

import { FunctionalTipsActions } from './functional-tips.actions';
import { FunctionalTip } from './functional-tips.models';

export interface FunctionalTipsState {
  error: string | null;
  loading: boolean;
  tips: FunctionalTip[];
}

export const initialFunctionalTipsState: FunctionalTipsState = {
  error: null,
  loading: false,
  tips: [],
};

export const functionalTipsFeature = createFeature({
  name: 'functionalTips',
  reducer: createReducer(
    initialFunctionalTipsState,
    on(FunctionalTipsActions.loadTips, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(FunctionalTipsActions.loadTipsSuccess, (state, { tips }) => ({
      ...state,
      error: null,
      loading: false,
      tips,
    })),
    on(FunctionalTipsActions.loadTipsFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
      tips: [],
    })),
  ),
});

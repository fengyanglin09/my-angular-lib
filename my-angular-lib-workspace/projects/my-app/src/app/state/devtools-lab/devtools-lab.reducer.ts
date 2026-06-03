import { createFeature, createReducer, on } from '@ngrx/store';

import { DevtoolsLabActions } from './devtools-lab.actions';
import { DevtoolsAuditEntry } from './devtools-lab.models';

export interface DevtoolsLabState {
  auditTrail: DevtoolsAuditEntry[];
  count: number;
  error: string | null;
  label: string;
  loading: boolean;
}

export const initialDevtoolsLabState: DevtoolsLabState = {
  auditTrail: [],
  count: 0,
  error: null,
  label: 'Ready to inspect',
  loading: false,
};

export const devtoolsLabFeature = createFeature({
  name: 'devtoolsLab',
  reducer: createReducer(
    initialDevtoolsLabState,
    on(DevtoolsLabActions.incrementCounter, (state) => ({
      ...state,
      count: state.count + 1,
    })),
    on(DevtoolsLabActions.setLabel, (state, { label }) => ({
      ...state,
      label,
    })),
    on(DevtoolsLabActions.loadAuditTrail, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(DevtoolsLabActions.loadAuditTrailSuccess, (state, { entries }) => ({
      ...state,
      auditTrail: entries,
      error: null,
      loading: false,
    })),
    on(DevtoolsLabActions.loadAuditTrailFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(DevtoolsLabActions.resetLab, () => initialDevtoolsLabState),
  ),
});


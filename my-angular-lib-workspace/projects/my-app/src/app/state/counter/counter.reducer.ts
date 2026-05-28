import { createFeature, createReducer, on } from '@ngrx/store';

import { CounterActions } from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialCounterState: CounterState = {
  count: 0,
};

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialCounterState,
    on(CounterActions.increment, (state) => ({
      ...state,
      count: state.count + 1,
    })),
    on(CounterActions.decrement, (state) => ({
      ...state,
      count: state.count - 1,
    })),
    on(CounterActions.reset, () => initialCounterState),
  ),
});

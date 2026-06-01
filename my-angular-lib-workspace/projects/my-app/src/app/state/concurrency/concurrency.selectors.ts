import { createSelector } from '@ngrx/store';

import { concurrencyFeature } from './concurrency.reducer';

export const { selectConcurrencyState, selectLogs, selectNextRequestId } =
  concurrencyFeature;

export const selectLogsByStrategy = createSelector(selectLogs, (logs) => ({
  concatMap: logs.filter((log) => log.strategy === 'concatMap'),
  exhaustMap: logs.filter((log) => log.strategy === 'exhaustMap'),
  mergeMap: logs.filter((log) => log.strategy === 'mergeMap'),
  switchMap: logs.filter((log) => log.strategy === 'switchMap'),
}));

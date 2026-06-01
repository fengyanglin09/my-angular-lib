import { createFeature, createReducer, on } from '@ngrx/store';

import { ConcurrencyActions } from './concurrency.actions';
import {
  ConcurrencyStrategy,
  RequestLog,
  RequestStatus,
} from './concurrency.models';

export interface ConcurrencyState {
  nextRequestId: number;
  logs: RequestLog[];
}

export const initialConcurrencyState: ConcurrencyState = {
  nextRequestId: 1,
  logs: [],
};

function isActive(status: RequestStatus): boolean {
  return status === 'queued' || status === 'running';
}

function hasActiveRequest(logs: RequestLog[], strategy: ConcurrencyStrategy): boolean {
  return logs.some((log) => log.strategy === strategy && isActive(log.status));
}

function cancelActiveSwitchRequests(logs: RequestLog[]): RequestLog[] {
  return logs.map((log) =>
    log.strategy === 'switchMap' && isActive(log.status)
      ? {
          ...log,
          message: `Request ${log.id} was cancelled by a newer switchMap request`,
          status: 'cancelled',
        }
      : log,
  );
}

function updateLog(
  logs: RequestLog[],
  strategy: ConcurrencyStrategy,
  id: number,
  changes: Pick<RequestLog, 'message' | 'status'>,
): RequestLog[] {
  return logs.map((log) =>
    log.strategy === strategy && log.id === id
      ? {
          ...log,
          ...changes,
        }
      : log,
  );
}

export const concurrencyFeature = createFeature({
  name: 'concurrency',
  reducer: createReducer(
    initialConcurrencyState,
    on(ConcurrencyActions.runRequest, (state, { strategy, id }) => {
      if (strategy === 'exhaustMap' && hasActiveRequest(state.logs, strategy)) {
        return {
          ...state,
          nextRequestId: id + 1,
          logs: [
            ...state.logs,
            {
              id,
              message: `Request ${id} was ignored because exhaustMap is busy`,
              status: 'ignored',
              strategy,
            },
          ],
        };
      }

      const status: RequestStatus = strategy === 'concatMap' ? 'queued' : 'running';
      const preparedLogs =
        strategy === 'switchMap' ? cancelActiveSwitchRequests(state.logs) : state.logs;

      return {
        ...state,
        nextRequestId: id + 1,
        logs: [
          ...preparedLogs,
          {
            id,
            message:
              status === 'queued'
                ? `Request ${id} is queued and will run in order`
                : `Request ${id} started`,
            status,
            strategy,
          },
        ],
      };
    }),
    on(ConcurrencyActions.requestStarted, (state, { strategy, id }) => ({
      ...state,
      logs: updateLog(state.logs, strategy, id, {
        message: `Request ${id} started`,
        status: 'running',
      }),
    })),
    on(ConcurrencyActions.requestSuccess, (state, { result }) => ({
      ...state,
      logs: updateLog(state.logs, result.strategy, result.id, {
        message: `Request ${result.id} completed at ${result.completedAt}`,
        status: 'completed',
      }),
    })),
    on(ConcurrencyActions.requestFailure, (state, { strategy, id, error }) => ({
      ...state,
      logs: updateLog(state.logs, strategy, id, {
        message: `Request ${id} failed: ${error}`,
        status: 'completed',
      }),
    })),
    on(ConcurrencyActions.clearLogs, () => initialConcurrencyState),
  ),
});

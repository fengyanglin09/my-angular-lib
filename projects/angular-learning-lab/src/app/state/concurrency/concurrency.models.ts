export type ConcurrencyStrategy = 'switchMap' | 'concatMap' | 'mergeMap' | 'exhaustMap';

export type RequestStatus = 'running' | 'queued' | 'completed' | 'cancelled' | 'ignored';

export interface RequestLog {
  id: number;
  message: string;
  status: RequestStatus;
  strategy: ConcurrencyStrategy;
}

export interface ConcurrencyResult {
  id: number;
  strategy: ConcurrencyStrategy;
  completedAt: string;
}

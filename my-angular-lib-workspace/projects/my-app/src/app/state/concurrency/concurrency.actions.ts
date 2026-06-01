import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  ConcurrencyResult,
  ConcurrencyStrategy,
} from './concurrency.models';

export const ConcurrencyActions = createActionGroup({
  source: 'Effect Concurrency Lesson',
  events: {
    'Run Request': props<{ strategy: ConcurrencyStrategy; id: number }>(),
    'Request Started': props<{ strategy: ConcurrencyStrategy; id: number }>(),
    'Request Success': props<{ result: ConcurrencyResult }>(),
    'Request Failure': props<{
      strategy: ConcurrencyStrategy;
      id: number;
      error: string;
    }>(),
    'Clear Logs': emptyProps(),
  },
});

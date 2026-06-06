import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concat,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';

import { ConcurrencyActions } from './concurrency.actions';
import { ConcurrencyApi } from './concurrency-api';
import { ConcurrencyStrategy } from './concurrency.models';

@Injectable()
export class ConcurrencyEffects {
  private readonly actions$ = inject(Actions);
  private readonly concurrencyApi = inject(ConcurrencyApi);

  readonly switchMapRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConcurrencyActions.runRequest),
      filter(({ strategy }) => strategy === 'switchMap'),
      switchMap(({ strategy, id }) => this.runBackendRequest(strategy, id)),
    ),
  );

  readonly concatMapRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConcurrencyActions.runRequest),
      filter(({ strategy }) => strategy === 'concatMap'),
      concatMap(({ strategy, id }) => this.runBackendRequest(strategy, id)),
    ),
  );

  readonly mergeMapRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConcurrencyActions.runRequest),
      filter(({ strategy }) => strategy === 'mergeMap'),
      mergeMap(({ strategy, id }) => this.runBackendRequest(strategy, id)),
    ),
  );

  readonly exhaustMapRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConcurrencyActions.runRequest),
      filter(({ strategy }) => strategy === 'exhaustMap'),
      exhaustMap(({ strategy, id }) => this.runBackendRequest(strategy, id)),
    ),
  );

  private runBackendRequest(strategy: ConcurrencyStrategy, id: number) {
    return concat(
      of(ConcurrencyActions.requestStarted({ strategy, id })),
      this.concurrencyApi.runRequest(strategy, id).pipe(
        map((result) => ConcurrencyActions.requestSuccess({ result })),
        catchError((error: Error) =>
          of(
            ConcurrencyActions.requestFailure({
              strategy,
              id,
              error: error.message,
            }),
          ),
        ),
      ),
    );
  }
}

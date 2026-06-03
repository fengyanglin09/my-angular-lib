import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { FunctionalTipsActions } from './functional-tips.actions';
import { FunctionalTipsApi } from './functional-tips-api';
import { FunctionalTipsNotifications } from './functional-tips-notifications';

export const loadFunctionalTips = createEffect(
  (
    actions$ = inject(Actions),
    functionalTipsApi = inject(FunctionalTipsApi),
  ) =>
    actions$.pipe(
      ofType(FunctionalTipsActions.loadTips),
      switchMap(({ shouldFail }) =>
        functionalTipsApi.loadTips(shouldFail).pipe(
          map((tips) => FunctionalTipsActions.loadTipsSuccess({ tips })),
          catchError((error: Error) =>
            of(FunctionalTipsActions.loadTipsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const functionalTipsNotifications = createEffect(
  (
    actions$ = inject(Actions),
    notifications = inject(FunctionalTipsNotifications),
  ) =>
    actions$.pipe(
      ofType(
        FunctionalTipsActions.loadTipsSuccess,
        FunctionalTipsActions.loadTipsFailure,
      ),
      tap((action) => {
        if (action.type === FunctionalTipsActions.loadTipsSuccess.type) {
          notifications.show(`Loaded ${action.tips.length} tips with a functional effect`);
          return;
        }

        notifications.show(action.error);
      }),
    ),
  { dispatch: false, functional: true },
);

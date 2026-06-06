import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DevtoolsLabActions } from './devtools-lab.actions';
import { DevtoolsLabApi } from './devtools-lab-api';

@Injectable()
export class DevtoolsLabEffects {
  private readonly actions$ = inject(Actions);
  private readonly devtoolsLabApi = inject(DevtoolsLabApi);

  readonly loadAuditTrail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevtoolsLabActions.loadAuditTrail),
      switchMap(({ shouldFail }) =>
        this.devtoolsLabApi.loadAuditTrail(shouldFail).pipe(
          map((entries) =>
            DevtoolsLabActions.loadAuditTrailSuccess({ entries }),
          ),
          catchError((error: Error) =>
            of(DevtoolsLabActions.loadAuditTrailFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}


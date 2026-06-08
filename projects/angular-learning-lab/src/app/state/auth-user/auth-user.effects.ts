import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthUserActions } from './auth-user.actions';
import { AuthUserApi } from './auth-user-api';

@Injectable()
export class AuthUserEffects {
  private readonly actions$ = inject(Actions);
  private readonly authUserApi = inject(AuthUserApi);

  readonly checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.checkSession),
      switchMap(() =>
        this.authUserApi.checkSession().pipe(
          map((user) => AuthUserActions.checkSessionSuccess({ user })),
          catchError((error: Error) =>
            of(AuthUserActions.checkSessionFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.login),
      switchMap(({ credentials, shouldFail }) =>
        this.authUserApi.login(credentials, shouldFail).pipe(
          map((user) => AuthUserActions.loginSuccess({ user })),
          catchError((error: Error) =>
            of(AuthUserActions.loginFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.logout),
      switchMap(() =>
        this.authUserApi.logout().pipe(
          map(() => AuthUserActions.logoutSuccess()),
        ),
      ),
    ),
  );
}

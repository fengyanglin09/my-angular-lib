import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthUserActions } from './auth-user.actions';
import { AuthUser } from './auth-user.models';

export interface AuthUserState {
  checkedSession: boolean;
  error: string | null;
  loading: boolean;
  user: AuthUser | null;
}

export const initialAuthUserState: AuthUserState = {
  checkedSession: false,
  error: null,
  loading: false,
  user: null,
};

export const authUserFeature = createFeature({
  name: 'authUser',
  reducer: createReducer(
    initialAuthUserState,
    on(AuthUserActions.checkSession, AuthUserActions.login, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(AuthUserActions.checkSessionSuccess, (state, { user }) => ({
      ...state,
      checkedSession: true,
      error: null,
      loading: false,
      user,
    })),
    on(AuthUserActions.loginSuccess, (state, { user }) => ({
      ...state,
      checkedSession: true,
      error: null,
      loading: false,
      user,
    })),
    on(AuthUserActions.checkSessionFailure, AuthUserActions.loginFailure, (state, { error }) => ({
      ...state,
      checkedSession: true,
      error,
      loading: false,
      user: null,
    })),
    on(AuthUserActions.logout, (state) => ({
      ...state,
      error: null,
      loading: true,
    })),
    on(AuthUserActions.logoutSuccess, (state) => ({
      ...state,
      error: null,
      loading: false,
      user: null,
    })),
  ),
});

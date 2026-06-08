import { createSelector } from '@ngrx/store';

import { authUserFeature } from './auth-user.reducer';

export const {
  selectAuthUserState,
  selectCheckedSession,
  selectError,
  selectLoading,
  selectUser,
} = authUserFeature;

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user) => user !== null,
);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role ?? 'guest',
);

export const selectAuthStatusLabel = createSelector(
  selectCheckedSession,
  selectLoading,
  selectUser,
  (checkedSession, loading, user) => {
    if (loading) {
      return 'Checking authentication...';
    }

    if (!checkedSession) {
      return 'Session has not been checked yet.';
    }

    return user ? `Signed in as ${user.name}` : 'Signed out';
  },
);

import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthUser, LoginCredentials } from './auth-user.models';

export const AuthUserActions = createActionGroup({
  source: 'Auth User Lesson',
  events: {
    'Check Session': emptyProps(),
    'Check Session Success': props<{ user: AuthUser | null }>(),
    'Check Session Failure': props<{ error: string }>(),
    Login: props<{ credentials: LoginCredentials; shouldFail: boolean }>(),
    'Login Success': props<{ user: AuthUser }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});

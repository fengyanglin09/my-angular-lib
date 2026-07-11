import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { LogoutCleanupDemo } from './logout-cleanup-demo';

export const authLesson06 = {
  number: 6,
  route: 'lesson-06-logout-cleanup',
  title: 'Logout Cleanup',
  intro:
    'Logout is more than navigating to login. It should clear session state, sensitive caches, pending user-specific state, and authorization headers.',
  keyPoints: [
    'Clear in-memory session state.',
    'Clear persisted auth/session storage when appropriate.',
    'Reset user-specific feature state so the next user does not see stale data.',
  ],
  mentalModel: `logout
  tell backend if needed
  clear local session
  clear user caches
  navigate to public screen`,
  demo: {
    title: 'Logout from a protected workspace',
    before: 'User-specific data and token are present.',
    after: 'Session and user-specific state are cleared before navigation.',
    actionLabel: 'Run logout cleanup',
  },
  codeSteps: [
    {
      name: 'Logout method',
      description: 'A single method coordinates cleanup.',
      syntax: `logout(): void {
  this.session.set(null);
  this.storage.remove('session');
  this.userCache.clear();
  this.router.navigate(['/login']);
}`,
    },
    {
      name: 'NgRx cleanup',
      description:
        'Apps with stores often dispatch a logout action that reducers handle.',
      syntax: `this.store.dispatch(AuthActions.logout());
this.store.dispatch(UserDataActions.clearUserData());`,
    },
    {
      name: 'Guard after logout',
      description:
        'Protected routes should reject navigation once session state is gone.',
      syntax: `return auth.isLoggedIn()
  ? true
  : router.createUrlTree(['/login']);`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-06-logout-cleanup',
  imports: [AuthLessonPage, LogoutCleanupDemo],
  templateUrl: './lesson-06-logout-cleanup.html',
  styleUrl: './lesson-06-logout-cleanup.css',
})
export class AuthLesson06LogoutCleanup {
  protected readonly lesson = authLesson06;
}

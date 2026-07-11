import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { TokenSessionHandlingDemo } from './token-session-handling-demo';

export const authLesson03 = {
  number: 3,
  route: 'lesson-03-token-session-handling',
  title: 'Token And Session Handling',
  intro:
    'Token/session handling is about keeping enough authenticated state for requests and UI while minimizing accidental exposure and stale state.',
  keyPoints: [
    'Prefer a single AuthSessionService/facade as the app boundary for session state.',
    'Keep token storage decisions explicit and consistent.',
    'Expose derived state such as isLoggedIn and currentUser for the UI.',
  ],
  mentalModel: `backend returns session
  access token
  user info
  expiry

auth session service
  stores current session
  exposes derived UI state

http layer
  attaches token to API requests`,
  demo: {
    title: 'Session is restored on app start',
    before: 'App starts with unknown session state.',
    after: 'Session service checks storage/backend and sets currentUser.',
    actionLabel: 'Simulate session restore',
  },
  codeSteps: [
    {
      name: 'Session model',
      description: 'Keep session shape explicit.',
      syntax: `interface UserSession {
  accessToken: string;
  expiresAt: string;
  user: CurrentUser;
}`,
    },
    {
      name: 'Session service',
      description:
        'Centralize session state instead of spreading token reads through components.',
      syntax: `readonly session = signal<UserSession | null>(null);
readonly isLoggedIn = computed(() => this.session() !== null);`,
    },
    {
      name: 'Request token',
      description:
        'Interceptors commonly read the current token and clone requests.',
      syntax: `const token = auth.session()?.accessToken;
return next(token
  ? request.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
  : request
);`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-03-token-session-handling',
  imports: [AuthLessonPage, TokenSessionHandlingDemo],
  templateUrl: './lesson-03-token-session-handling.html',
  styleUrl: './lesson-03-token-session-handling.css',
})
export class AuthLesson03TokenSessionHandling {
  protected readonly lesson = authLesson03;
}

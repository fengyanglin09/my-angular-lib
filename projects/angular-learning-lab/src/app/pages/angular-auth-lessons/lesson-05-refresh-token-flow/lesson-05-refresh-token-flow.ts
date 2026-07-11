import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { RefreshTokenFlowDemo } from './refresh-token-flow-demo';

export const authLesson05 = {
  number: 5,
  route: 'lesson-05-refresh-token-flow',
  title: 'Refresh Token Flow',
  intro:
    'A refresh flow renews an expired access token without forcing the user to log in again. It is usually handled near the HTTP layer.',
  keyPoints: [
    'Access tokens are often short lived.',
    'Refresh should usually be centralized so many failing requests do not start many refresh calls.',
    'If refresh fails, clear session state and redirect to login.',
  ],
  mentalModel: `API request
  returns 401

auth interceptor
  pauses request
  refreshes token
  retries original request

refresh fails
  logout cleanup`,
  demo: {
    title: 'Expired access token is refreshed',
    before: 'A request gets 401 because the token expired.',
    after: 'Interceptor refreshes token and retries once.',
    actionLabel: 'Simulate refresh cycle',
  },
  codeSteps: [
    {
      name: 'Catch 401',
      description:
        'Interceptors can handle auth failures before components see them.',
      syntax: `return next(request).pipe(
  catchError((error) =>
    error.status === 401
      ? refreshAndRetry(request, next)
      : throwError(() => error)
  )
);`,
    },
    {
      name: 'Refresh once',
      description: 'The refresh call asks the backend for a new access token.',
      syntax: `refreshSession(): Observable<UserSession> {
  return this.http.post<UserSession>('/api/refresh', {});
}`,
    },
    {
      name: 'Retry original',
      description:
        'After refresh succeeds, clone the original request with the new token.',
      syntax: `return next(addToken(originalRequest, newAccessToken));`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-05-refresh-token-flow',
  imports: [AuthLessonPage, RefreshTokenFlowDemo],
  templateUrl: './lesson-05-refresh-token-flow.html',
  styleUrl: './lesson-05-refresh-token-flow.css',
})
export class AuthLesson05RefreshTokenFlow {
  protected readonly lesson = authLesson05;
}

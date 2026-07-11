import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { LoginFlowDemo } from './login-flow-demo';

export const authLesson01 = {
  number: 1,
  route: 'lesson-01-login-flow',
  title: 'Login Flow',
  intro:
    'A login flow collects credentials, sends them to the backend, stores the returned session state, and redirects the user to the intended page.',
  keyPoints: [
    'The frontend should not invent authentication; it asks the backend.',
    'Store only the session data the app needs to make UI and request decisions.',
    'Preserve returnUrl when a guard redirects the user to login.',
  ],
  mentalModel: `login form
  collects credentials

auth API
  validates credentials

session store
  remembers authenticated user

router
  returns user to intended page`,
  demo: {
    title: 'User tries to open protected dashboard',
    before: 'Guard redirects to login with returnUrl.',
    after: 'Successful login navigates back to the dashboard.',
    actionLabel: 'Simulate login success',
  },
  codeSteps: [
    {
      name: 'Submit credentials',
      description:
        'The component delegates authentication to an API/facade service.',
      syntax: `login(): void {
  this.auth.login(this.form.getRawValue(), this.returnUrl());
}`,
    },
    {
      name: 'Auth service',
      description:
        'The service calls the backend and stores session state on success.',
      syntax: `login(credentials: LoginRequest): Observable<UserSession> {
  return this.http.post<UserSession>('/api/login', credentials);
}`,
    },
    {
      name: 'Navigate after login',
      description: 'The router sends the user back to where they wanted to go.',
      syntax: `this.router.navigateByUrl(returnUrl || '/dashboard');`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-01-login-flow',
  imports: [AuthLessonPage, LoginFlowDemo],
  templateUrl: './lesson-01-login-flow.html',
  styleUrl: './lesson-01-login-flow.css',
})
export class AuthLesson01LoginFlow {
  protected readonly lesson = authLesson01;
}

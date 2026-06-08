import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthUser, LoginCredentials } from './auth-user.models';

@Injectable({ providedIn: 'root' })
export class AuthUserApi {
  private currentSessionUser: AuthUser | null = null;

  private readonly demoUser: AuthUser = {
    email: 'mark@example.com',
    id: 101,
    name: 'Mark Lin',
    role: 'student',
  };

  checkSession(): Observable<AuthUser | null> {
    return new Observable<AuthUser | null>((observer) => {
      const timerId = window.setTimeout(() => {
        observer.next(this.currentSessionUser);
        observer.complete();
      }, 450);

      return () => window.clearTimeout(timerId);
    });
  }

  login(credentials: LoginCredentials, shouldFail: boolean): Observable<AuthUser> {
    return new Observable<AuthUser>((observer) => {
      const timerId = window.setTimeout(() => {
        if (shouldFail || !credentials.email.trim() || !credentials.password.trim()) {
          observer.error(new Error('The auth API rejected these credentials.'));
          return;
        }

        this.currentSessionUser = {
          ...this.demoUser,
          email: credentials.email,
        };

        observer.next(this.currentSessionUser);
        observer.complete();
      }, 650);

      return () => window.clearTimeout(timerId);
    });
  }

  logout(): Observable<void> {
    return new Observable<void>((observer) => {
      const timerId = window.setTimeout(() => {
        this.currentSessionUser = null;
        observer.next();
        observer.complete();
      }, 350);

      return () => window.clearTimeout(timerId);
    });
  }
}

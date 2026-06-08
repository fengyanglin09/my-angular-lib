import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { AuthUserActions } from '../../../state/auth-user/auth-user.actions';
import {
  selectAuthStatusLabel,
  selectError,
  selectIsLoggedIn,
  selectLoading,
  selectUser,
  selectUserRole,
} from '../../../state/auth-user/auth-user.selectors';

@Component({
  selector: 'app-lesson-26-auth-user',
  imports: [LearningNav],
  templateUrl: './lesson-26-auth-user.html',
  styleUrl: './lesson-26-auth-user.css',
})
export class Lesson26AuthUser {
  private readonly store = inject(Store);

  protected readonly error = this.store.selectSignal(selectError);
  protected readonly isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly statusLabel = this.store.selectSignal(selectAuthStatusLabel);
  protected readonly user = this.store.selectSignal(selectUser);
  protected readonly userRole = this.store.selectSignal(selectUserRole);

  protected checkSession(): void {
    this.store.dispatch(AuthUserActions.checkSession());
  }

  protected login(): void {
    this.store.dispatch(
      AuthUserActions.login({
        credentials: {
          email: 'mark@example.com',
          password: 'learning-lab',
        },
        shouldFail: false,
      }),
    );
  }

  protected loginFailure(): void {
    this.store.dispatch(
      AuthUserActions.login({
        credentials: {
          email: 'mark@example.com',
          password: 'wrong-password',
        },
        shouldFail: true,
      }),
    );
  }

  protected logout(): void {
    this.store.dispatch(AuthUserActions.logout());
  }
}

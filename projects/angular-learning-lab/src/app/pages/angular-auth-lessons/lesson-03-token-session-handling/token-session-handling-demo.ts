import { Component, computed, signal } from '@angular/core';

interface DemoSession {
  accessToken: string;
  expiresIn: string;
  user: string;
}

@Component({
  selector: 'app-token-session-handling-demo',
  templateUrl: './token-session-handling-demo.html',
  styleUrl: './token-session-handling-demo.css',
})
export class TokenSessionHandlingDemo {
  protected readonly session = signal<DemoSession | null>(null);
  protected readonly storageHasSession = signal(true);
  protected readonly isLoggedIn = computed(() => this.session() !== null);
  protected readonly authorizationHeader = computed(() =>
    this.session()
      ? `Bearer ${this.session()?.accessToken}`
      : 'No Authorization header'
  );
  protected readonly log = signal(
    'App started. Session state is unknown until checked.'
  );

  protected restoreSession(): void {
    if (!this.storageHasSession()) {
      this.session.set(null);
      this.log.set('No stored session found. UI remains logged out.');
      return;
    }

    this.session.set({
      accessToken: 'demo-access-token',
      expiresIn: '12 minutes',
      user: 'lin@example.com',
    });
    this.log.set('Session restored from the auth boundary.');
  }

  protected clearSession(): void {
    this.session.set(null);
    this.storageHasSession.set(false);
    this.log.set(
      'Session cleared. Derived UI state and request header changed.'
    );
  }
}

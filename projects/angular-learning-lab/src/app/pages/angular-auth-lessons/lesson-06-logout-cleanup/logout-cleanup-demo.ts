import { Component, computed, signal } from '@angular/core';

interface CleanupState {
  featureCache: boolean;
  persistedSession: boolean;
  session: boolean;
  userDraft: boolean;
}

@Component({
  selector: 'app-logout-cleanup-demo',
  templateUrl: './logout-cleanup-demo.html',
  styleUrl: './logout-cleanup-demo.css',
})
export class LogoutCleanupDemo {
  protected readonly cleanupState = signal<CleanupState>({
    featureCache: true,
    persistedSession: true,
    session: true,
    userDraft: true,
  });
  protected readonly currentRoute = signal('/workspace/projects');
  protected readonly allClear = computed(() =>
    Object.values(this.cleanupState()).every((value) => value === false)
  );
  protected readonly log = signal('User is inside a protected workspace.');

  protected runLogout(): void {
    this.cleanupState.set({
      featureCache: false,
      persistedSession: false,
      session: false,
      userDraft: false,
    });
    this.currentRoute.set('/login');
    this.log.set(
      'Cleared session and user-specific state, then navigated to login.'
    );
  }

  protected restoreDemoState(): void {
    this.cleanupState.set({
      featureCache: true,
      persistedSession: true,
      session: true,
      userDraft: true,
    });
    this.currentRoute.set('/workspace/projects');
    this.log.set('Demo state restored with user-specific data present.');
  }
}

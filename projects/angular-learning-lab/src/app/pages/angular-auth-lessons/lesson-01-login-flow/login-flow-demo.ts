import { Component, signal } from '@angular/core';

type LoginStep = 'blocked' | 'login' | 'authenticated';

@Component({
  selector: 'app-login-flow-demo',
  templateUrl: './login-flow-demo.html',
  styleUrl: './login-flow-demo.css',
})
export class LoginFlowDemo {
  protected readonly step = signal<LoginStep>('blocked');
  protected readonly returnUrl = signal('/workspace/dashboard');
  protected readonly currentUrl = signal(
    '/login?returnUrl=/workspace/dashboard'
  );
  protected readonly sessionUser = signal<string | null>(null);
  protected readonly log = signal(
    'Guard blocked the protected URL and sent the user to login with returnUrl.'
  );

  protected requestProtectedRoute(): void {
    this.step.set('blocked');
    this.sessionUser.set(null);
    this.currentUrl.set('/login?returnUrl=/workspace/dashboard');
    this.log.set('Guard redirected to login and preserved the intended URL.');
  }

  protected submitLogin(): void {
    this.step.set('authenticated');
    this.sessionUser.set('lin@example.com');
    this.currentUrl.set(this.returnUrl());
    this.log.set(
      'Backend accepted credentials. App stored session and navigated to returnUrl.'
    );
  }
}

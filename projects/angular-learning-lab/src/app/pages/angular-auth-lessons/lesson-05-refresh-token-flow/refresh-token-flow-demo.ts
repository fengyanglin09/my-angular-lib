import { Component, signal } from '@angular/core';

type RequestState =
  | 'idle'
  | 'requesting'
  | 'refreshing'
  | 'retrying'
  | 'success'
  | 'logged-out';

@Component({
  selector: 'app-refresh-token-flow-demo',
  templateUrl: './refresh-token-flow-demo.html',
  styleUrl: './refresh-token-flow-demo.css',
})
export class RefreshTokenFlowDemo {
  protected readonly state = signal<RequestState>('idle');
  protected readonly accessToken = signal('expired-token');
  protected readonly refreshAvailable = signal(true);
  protected readonly log = signal<string[]>([
    'Ready. The current access token is expired.',
  ]);

  protected async runRequest(): Promise<void> {
    this.log.set(['API request sent with expired access token.']);
    this.state.set('requesting');
    await this.wait(350);

    this.log.update((entries) => [...entries, 'Backend returned 401.']);

    if (!this.refreshAvailable()) {
      this.state.set('logged-out');
      this.accessToken.set('none');
      this.log.update((entries) => [
        ...entries,
        'Refresh failed. Clear session and redirect to login.',
      ]);
      return;
    }

    this.state.set('refreshing');
    this.log.update((entries) => [...entries, 'Refreshing access token...']);
    await this.wait(450);

    this.accessToken.set('fresh-token');
    this.state.set('retrying');
    this.log.update((entries) => [
      ...entries,
      'Refresh succeeded. Retrying original request once.',
    ]);
    await this.wait(350);

    this.state.set('success');
    this.log.update((entries) => [...entries, 'Retried request succeeded.']);
  }

  protected toggleRefreshAvailability(): void {
    this.refreshAvailable.update((available) => !available);
    this.log.set([
      this.refreshAvailable()
        ? 'Refresh endpoint will succeed.'
        : 'Refresh endpoint will fail.',
    ]);
  }

  protected reset(): void {
    this.state.set('idle');
    this.accessToken.set('expired-token');
    this.refreshAvailable.set(true);
    this.log.set(['Ready. The current access token is expired.']);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }
}

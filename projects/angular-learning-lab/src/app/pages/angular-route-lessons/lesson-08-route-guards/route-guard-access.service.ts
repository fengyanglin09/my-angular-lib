import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RouteGuardAccessService {
  readonly adminAccess = signal(false);
  readonly guardLog = signal<string[]>([
    'Guard demo ready. Try opening the admin page before granting access.',
  ]);

  grantAdminAccess(): void {
    this.adminAccess.set(true);
    this.addLog('Access state changed: admin access granted.');
  }

  revokeAdminAccess(): void {
    this.adminAccess.set(false);
    this.addLog('Access state changed: admin access revoked.');
  }

  recordGuardDecision(message: string): void {
    this.addLog(message);
  }

  clearLog(): void {
    this.guardLog.set(['Log cleared. Navigate to admin to run the guard again.']);
  }

  private addLog(message: string): void {
    this.guardLog.update((logs) => [...logs, message]);
  }
}

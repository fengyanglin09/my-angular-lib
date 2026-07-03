import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanMatchAccessService {
  readonly hasProtectedAccess = signal(false);
  readonly routeLog = signal<string[]>([
    'canMatch lesson loaded. Protected access starts disabled.',
  ]);

  grantAccess(): void {
    this.hasProtectedAccess.set(true);
    this.addLog('Access granted. The protected route can now match.');
  }

  revokeAccess(): void {
    this.hasProtectedAccess.set(false);
    this.addLog('Access revoked. The next protected navigation will be redirected.');
  }

  useVisitorSession(): void {
    this.hasProtectedAccess.set(false);
    this.addLog('Session role changed to Visitor. Protected Feature access is not present.');
  }

  useProtectedFeatureSession(): void {
    this.hasProtectedAccess.set(true);
    this.addLog('Session role changed to Protected Feature member.');
  }

  hasRole(requiredRole: string | undefined): boolean {
    if (!requiredRole) {
      return true;
    }

    return requiredRole === 'Protected Feature' && this.hasProtectedAccess();
  }

  addLog(message: string): void {
    this.routeLog.update((logs) => [...logs, message]);
  }

  clearLog(): void {
    this.routeLog.set(['Log cleared. Try the protected route again.']);
  }
}

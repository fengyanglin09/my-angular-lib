import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RouterEventsAccessService {
  readonly hasReporterAccess = signal(false);

  useVisitorSession(): void {
    this.hasReporterAccess.set(false);
  }

  useReporterSession(): void {
    this.hasReporterAccess.set(true);
  }

  hasRole(requiredRole: string | undefined): boolean {
    if (!requiredRole) {
      return true;
    }

    return requiredRole === 'Reporter' && this.hasReporterAccess();
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LazyRoutesLogService {
  readonly routeLog = signal<string[]>([
    'Lesson route loaded. The lazy admin child routes have not been requested yet.',
  ]);

  addLog(message: string): void {
    this.routeLog.update((logs) => [...logs, message]);
  }

  clearLog(): void {
    this.routeLog.set(['Log cleared. Click a lazy admin route to load it again.']);
  }
}

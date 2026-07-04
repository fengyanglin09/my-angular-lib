import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RouterEventsLogService {
  readonly extraLog = signal<string[]>([
    'Router events lesson ready. Navigate between child routes to see the sequence.',
  ]);

  addLog(message: string): void {
    this.extraLog.update((logs) => [...logs, message]);
  }

  clearLog(): void {
    this.extraLog.set(['Extra log cleared. Navigate again to see guard and resolver notes.']);
  }
}

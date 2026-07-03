import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanDeactivateDemoService {
  readonly guardLog = signal<string[]>([
    'CanDeactivate demo ready. Edit the draft, then try to open preview.',
  ]);

  addLog(message: string): void {
    this.guardLog.update((logs) => [...logs, message]);
  }

  clearLog(): void {
    this.guardLog.set(['Log cleared. Try leaving the editor again.']);
  }
}

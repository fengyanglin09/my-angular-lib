import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoutePreloadingLogService {
  readonly preloadingLog = signal<string[]>([
    'Preloading log ready. Routes only preload when data.preload is true.',
  ]);

  addLog(message: string): void {
    this.preloadingLog.update((logs) => [...logs, message]);
  }

  clearLog(): void {
    this.preloadingLog.set(['Log cleared. Navigate within route lessons to see preloading decisions.']);
  }
}

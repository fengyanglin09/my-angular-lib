import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RootVisitCounterService {
  readonly createdAt = new Date().toLocaleTimeString();
  readonly visitCount = signal(0);

  recordVisit(): void {
    this.visitCount.update((count) => count + 1);
  }
}

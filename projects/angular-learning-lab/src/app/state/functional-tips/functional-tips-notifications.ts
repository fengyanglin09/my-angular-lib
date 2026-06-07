import { Injectable, signal } from '@angular/core';

import { FunctionalTipNotification } from './functional-tips.models';

@Injectable({ providedIn: 'root' })
export class FunctionalTipsNotifications {
  private nextId = 1;
  private readonly notificationsSignal = signal<FunctionalTipNotification[]>([]);

  readonly notifications = this.notificationsSignal.asReadonly();

  clear(): void {
    this.notificationsSignal.set([]);
    this.nextId = 1;
  }

  show(message: string): void {
    this.notificationsSignal.update((notifications) =>
      [
        {
          id: this.nextId,
          message,
        },
        ...notifications,
      ].slice(0, 5),
    );
    this.nextId += 1;
  }
}

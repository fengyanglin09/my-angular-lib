import { Injectable, signal } from '@angular/core';

export interface BookNoteNotification {
  id: number;
  message: string;
  tone: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class SelectedBookNotesNotifications {
  private nextId = 1;
  private readonly notificationsSignal = signal<BookNoteNotification[]>([]);

  readonly notifications = this.notificationsSignal.asReadonly();

  clear(): void {
    this.notificationsSignal.set([]);
    this.nextId = 1;
  }

  show(message: string, tone: BookNoteNotification['tone']): void {
    this.notificationsSignal.update((notifications) =>
      [
        {
          id: this.nextId,
          message,
          tone,
        },
        ...notifications,
      ].slice(0, 5),
    );

    this.nextId += 1;
  }
}

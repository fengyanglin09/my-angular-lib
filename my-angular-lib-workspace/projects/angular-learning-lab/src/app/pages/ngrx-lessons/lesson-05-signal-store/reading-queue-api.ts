import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { QueueItem, QueueSnapshot } from './reading-queue.models';

const serverSeedItems: QueueItem[] = [
  {
    id: 1,
    title: 'Signals mental model',
    minutes: 25,
    status: 'reading',
  },
  {
    id: 2,
    title: 'NgRx Store recap',
    minutes: 35,
    status: 'queued',
  },
  {
    id: 3,
    title: 'Entity adapter notes',
    minutes: 20,
    status: 'done',
  },
];

@Injectable({ providedIn: 'root' })
export class ReadingQueueApi {
  private serverItems = structuredClone(serverSeedItems);
  private savedAt: string | null = null;

  loadQueue(): Observable<QueueSnapshot> {
    return of({
      items: structuredClone(this.serverItems),
      savedAt: this.savedAt,
    }).pipe(delay(500));
  }

  resetQueue(): Observable<QueueSnapshot> {
    this.serverItems = structuredClone(serverSeedItems);
    this.savedAt = new Date().toLocaleTimeString();

    return this.loadQueue();
  }

  saveQueue(items: QueueItem[]): Observable<QueueSnapshot> {
    this.serverItems = structuredClone(items);
    this.savedAt = new Date().toLocaleTimeString();

    return of({
      items: structuredClone(this.serverItems),
      savedAt: this.savedAt,
    }).pipe(delay(500));
  }
}

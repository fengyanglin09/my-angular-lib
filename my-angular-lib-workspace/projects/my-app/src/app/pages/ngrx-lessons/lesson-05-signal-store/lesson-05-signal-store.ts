import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ReadingQueueStore } from './reading-queue.store';

@Component({
  selector: 'app-lesson-05-signal-store',
  imports: [FormsModule, RouterLink],
  providers: [ReadingQueueStore],
  templateUrl: './lesson-05-signal-store.html',
  styleUrl: './lesson-05-signal-store.css',
})
export class Lesson05SignalStore {
  protected readonly queueStore = inject(ReadingQueueStore);
  protected newItemMinutes = 30;
  protected newItemTitle = '';

  protected addItem(): void {
    this.queueStore.addItem(this.newItemTitle, this.newItemMinutes);
    this.newItemTitle = '';
    this.newItemMinutes = 30;
  }
}

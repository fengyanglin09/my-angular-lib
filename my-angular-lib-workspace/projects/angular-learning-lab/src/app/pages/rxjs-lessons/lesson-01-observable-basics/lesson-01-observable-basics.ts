import { Component, OnDestroy, signal } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

@Component({
  selector: 'app-lesson-01-observable-basics',
  imports: [LearningNav],
  templateUrl: './lesson-01-observable-basics.html',
  styleUrl: './lesson-01-observable-basics.css',
})
export class Lesson01ObservableBasics implements OnDestroy {
  private activeSubscription: Subscription | null = null;

  protected readonly logs = signal<string[]>([
    'Observable is defined, but nothing is running yet.',
  ]);
  protected readonly running = signal(false);

  ngOnDestroy(): void {
    this.stopStream();
  }

  protected runColdObservable(): void {
    this.stopStream();
    this.logs.set(['Button clicked: about to subscribe.']);

    const numbers$ = new Observable<number>((observer) => {
      this.addLog('Producer started because subscribe() was called.');

      let value = 1;
      const intervalId = window.setInterval(() => {
        observer.next(value);
        value += 1;

        if (value > 3) {
          observer.complete();
          window.clearInterval(intervalId);
        }
      }, 700);

      return () => {
        window.clearInterval(intervalId);
        this.addLog('Cleanup ran because the subscription ended.');
        this.running.set(false);
      };
    });

    this.running.set(true);
    this.activeSubscription = numbers$.subscribe({
      complete: () => this.addLog('Observable completed after emitting 3 values.'),
      next: (value) => this.addLog(`Subscriber received value ${value}.`),
    });
  }

  protected runSingleValueObservable(): void {
    this.stopStream();
    this.logs.set(['of("hello") creates an Observable that emits once.']);

    of('hello').subscribe({
      complete: () => this.addLog('Single-value Observable completed.'),
      next: (value) => this.addLog(`Subscriber received "${value}".`),
    });
  }

  protected stopStream(): void {
    if (!this.activeSubscription) {
      return;
    }

    this.activeSubscription.unsubscribe();
    this.activeSubscription = null;
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

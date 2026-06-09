import { Component, OnDestroy, signal } from '@angular/core';
import { Observable, share, shareReplay, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type DemoMode = 'cold' | 'share' | 'shareReplay';

@Component({
  selector: 'app-lesson-22-share-replay',
  imports: [LearningNav],
  templateUrl: './lesson-22-share-replay.html',
  styleUrl: './lesson-22-share-replay.css',
})
export class Lesson22ShareReplay implements OnDestroy {
  private requestCount = 0;
  private subscriptions = new Subscription();
  private subscriberTimers: number[] = [];

  protected readonly logs = signal<string[]>([
    'Choose a demo. Subscriber B joins while the request is running; Subscriber C joins after it completed.',
  ]);
  protected readonly requestLabel = signal('No request yet');

  protected readonly examples = [
    {
      description: 'Each subscriber starts its own backend request.',
      name: 'Cold source',
      syntax: 'const data$ = fakeHttp()',
    },
    {
      description: 'Active subscribers share one request; a late subscriber starts a new request.',
      name: 'share',
      syntax: 'fakeHttp().pipe(share())',
    },
    {
      description: 'Subscribers share one request and late subscribers receive the latest cached value.',
      name: 'shareReplay',
      syntax: 'fakeHttp().pipe(shareReplay({ bufferSize: 1, refCount: true }))',
    },
  ];

  ngOnDestroy(): void {
    this.clearDemoWork();
  }

  protected runDemo(mode: DemoMode): void {
    this.clearDemoWork();
    this.logs.set([`${mode} demo started.`]);
    const sharedSource$ = this.createSource(mode);

    this.addLog('Subscriber A subscribes immediately.');
    this.subscribeToSource(sharedSource$, 'Subscriber A');
    this.scheduleSubscriber(
      sharedSource$,
      'Subscriber B',
      250,
      'while request #1 is still running',
    );
    this.scheduleSubscriber(
      sharedSource$,
      'Subscriber C',
      900,
      'after request #1 already completed',
    );
  }

  protected reset(): void {
    this.clearDemoWork();
    this.requestCount = 0;
    this.logs.set([
      'Choose a demo. Subscriber B joins while the request is running; Subscriber C joins after it completed.',
    ]);
    this.requestLabel.set('No request yet');
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private clearDemoWork(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.subscriberTimers.forEach((timerId) => window.clearTimeout(timerId));
    this.subscriberTimers = [];
  }

  private scheduleSubscriber(
    source$: Observable<string>,
    subscriberName: string,
    delayMs: number,
    timing: string,
  ): void {
    const timerId = window.setTimeout(() => {
      this.addLog(`${subscriberName} subscribes ${timing}.`);
      this.subscribeToSource(source$, subscriberName);
    }, delayMs);

    this.subscriberTimers.push(timerId);
  }

  private subscribeToSource(
    source$: Observable<string>,
    subscriberName: string,
  ): void {
    this.subscriptions.add(
      source$.subscribe({
        next: (value) => this.addLog(`${subscriberName} received "${value}".`),
        complete: () => this.addLog(`${subscriberName} completed.`),
      }),
    );
  }

  private createSource(mode: DemoMode): Observable<string> {
    const source$ = this.fakeHttpRequest();

    if (mode === 'share') {
      return source$.pipe(share());
    }

    if (mode === 'shareReplay') {
      return source$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }

    return source$;
  }

  private fakeHttpRequest(): Observable<string> {
    return new Observable<string>((observer) => {
      this.requestCount += 1;
      const requestId = this.requestCount;

      this.requestLabel.set(`Backend request #${requestId}`);
      this.addLog(`Backend request #${requestId} started.`);

      const timerId = window.setTimeout(() => {
        observer.next(`profile payload from request #${requestId}`);
        observer.complete();
        this.addLog(`Backend request #${requestId} completed.`);
      }, 700);

      return () => window.clearTimeout(timerId);
    });
  }
}

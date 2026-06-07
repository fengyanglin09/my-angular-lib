import { Component, signal } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface SubjectDemo {
  description: string;
  name: string;
  realWorldUse: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-12-subjects-multicasting',
  imports: [LearningNav],
  templateUrl: './lesson-12-subjects-multicasting.html',
  styleUrl: './lesson-12-subjects-multicasting.css',
})
export class Lesson12SubjectsMulticasting {
  private behaviorSubject = new BehaviorSubject('seed');
  private plainSubject = new Subject<string>();
  private replaySubject = new ReplaySubject<string>(2);
  private subscriptions = new Subscription();
  private valueNumber = 0;

  protected readonly behaviorLogs = signal<string[]>([]);
  protected readonly plainLogs = signal<string[]>([]);
  protected readonly replayLogs = signal<string[]>([]);

  protected readonly demos: SubjectDemo[] = [
    {
      description:
        'Multicasts only values emitted after a subscriber is listening.',
      name: 'Subject',
      realWorldUse: 'Button clicks, submit events, and command streams.',
      syntax: 'const events$ = new Subject<string>()',
    },
    {
      description:
        'Stores one current value and immediately gives it to new subscribers.',
      name: 'BehaviorSubject',
      realWorldUse: 'Local UI state like selected id, filter, or current user.',
      syntax: "const filter$ = new BehaviorSubject('all')",
    },
    {
      description:
        'Stores a configurable number of previous values for late subscribers.',
      name: 'ReplaySubject',
      realWorldUse: 'Recent notifications, logs, or values that late subscribers should catch up on.',
      syntax: 'const messages$ = new ReplaySubject<string>(2)',
    },
  ];

  constructor() {
    this.subscribeA();
  }

  protected addSubscriberB(): void {
    this.addPlainLog('Subscriber B subscribed to plain Subject.');
    this.addBehaviorLog('Subscriber B subscribed to BehaviorSubject.');
    this.addReplayLog('Subscriber B subscribed to ReplaySubject.');

    this.subscriptions.add(
      this.plainSubject.subscribe((value) =>
        this.addPlainLog(`Subscriber B received "${value}".`),
      ),
    );
    this.subscriptions.add(
      this.behaviorSubject.subscribe((value) =>
        this.addBehaviorLog(`Subscriber B received "${value}".`),
      ),
    );
    this.subscriptions.add(
      this.replaySubject.subscribe((value) =>
        this.addReplayLog(`Subscriber B received "${value}".`),
      ),
    );
  }

  protected emitValue(): void {
    this.valueNumber += 1;
    const value = `value ${this.valueNumber}`;

    this.addPlainLog(`next("${value}") called.`);
    this.addBehaviorLog(`next("${value}") called.`);
    this.addReplayLog(`next("${value}") called.`);

    this.plainSubject.next(value);
    this.behaviorSubject.next(value);
    this.replaySubject.next(value);
  }

  protected reset(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.valueNumber = 0;
    this.behaviorSubject = new BehaviorSubject('seed');
    this.plainSubject = new Subject<string>();
    this.replaySubject = new ReplaySubject<string>(2);
    this.plainLogs.set([]);
    this.behaviorLogs.set([]);
    this.replayLogs.set([]);
    this.subscribeA();
  }

  private addBehaviorLog(message: string): void {
    this.behaviorLogs.update((logs) => [...logs, message]);
  }

  private addPlainLog(message: string): void {
    this.plainLogs.update((logs) => [...logs, message]);
  }

  private addReplayLog(message: string): void {
    this.replayLogs.update((logs) => [...logs, message]);
  }

  private subscribeA(): void {
    this.addPlainLog('Subscriber A subscribed to plain Subject.');
    this.addBehaviorLog(
      'Subscriber A subscribed to BehaviorSubject with initial value "seed".',
    );
    this.addReplayLog('Subscriber A subscribed to ReplaySubject.');

    this.subscriptions.add(
      this.plainSubject.subscribe((value) =>
        this.addPlainLog(`Subscriber A received "${value}".`),
      ),
    );
    this.subscriptions.add(
      this.behaviorSubject.subscribe((value) =>
        this.addBehaviorLog(`Subscriber A received "${value}".`),
      ),
    );
    this.subscriptions.add(
      this.replaySubject.subscribe((value) =>
        this.addReplayLog(`Subscriber A received "${value}".`),
      ),
    );
  }
}

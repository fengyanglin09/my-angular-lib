import { Component, OnDestroy, signal } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  tap,
  withLatestFrom,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CombiningOperator {
  description: string;
  name: string;
  realWorldUse: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-07-combining-streams',
  imports: [LearningNav],
  templateUrl: './lesson-07-combining-streams.html',
  styleUrl: './lesson-07-combining-streams.css',
})
export class Lesson07CombiningStreams implements OnDestroy {
  private activeSubscription = new Subscription();
  private readonly timerIds: number[] = [];

  protected readonly activeDemo = signal('None');
  protected readonly results = signal<string[]>([]);
  protected readonly logs = signal<string[]>([
    'Choose a combining demo to see how multiple streams work together.',
  ]);

  protected readonly operators: CombiningOperator[] = [
    {
      description:
        'Emits whenever any source emits, after every source has emitted at least once.',
      name: 'combineLatest',
      realWorldUse: 'Build a live view model from filters, route params, and user settings.',
      syntax: 'combineLatest([filter$, search$])',
    },
    {
      description:
        'Emits only when the main source emits, then reads the latest values from other streams.',
      name: 'withLatestFrom',
      realWorldUse: 'Save a form when the button is clicked using the latest form state.',
      syntax: 'saveClick$.pipe(withLatestFrom(form$))',
    },
    {
      description:
        'Waits for every source to complete, then emits the last value from each source once.',
      name: 'forkJoin',
      realWorldUse: 'Load several backend resources before showing a screen.',
      syntax: 'forkJoin({ profile$, settings$ })',
    },
  ];

  ngOnDestroy(): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
  }

  protected runCombineLatestDemo(): void {
    this.startDemo('combineLatest');

    const category$ = new BehaviorSubject('Books');
    const search$ = new BehaviorSubject('angular');

    this.activeSubscription.add(
      combineLatest([category$, search$])
        .pipe(
          map(
            ([category, search]) =>
              `Showing ${category.toLowerCase()} matching "${search}"`,
          ),
        )
        .subscribe((viewModel) => {
          this.results.update((results) => [...results, viewModel]);
          this.addLog(`combineLatest emitted "${viewModel}".`);
        }),
    );

    this.schedule(() => {
      this.addLog('Search stream emitted "rxjs".');
      search$.next('rxjs');
    }, 500);

    this.schedule(() => {
      this.addLog('Category stream emitted "Courses".');
      category$.next('Courses');
    }, 1000);

    this.schedule(() => {
      this.addLog('Search stream emitted "signals".');
      search$.next('signals');
    }, 1500);
  }

  protected runWithLatestFromDemo(): void {
    this.startDemo('withLatestFrom');

    const draft$ = new BehaviorSubject('Draft v1');
    const saveClick$ = new Subject<void>();

    this.activeSubscription.add(
      saveClick$.pipe(withLatestFrom(draft$)).subscribe(([, draft]) => {
        const savedMessage = `Saved "${draft}"`;

        this.results.update((results) => [...results, savedMessage]);
        this.addLog(`withLatestFrom emitted because saveClick$ emitted.`);
      }),
    );

    this.schedule(() => {
      this.addLog('Draft stream emitted "Draft v2" without saving.');
      draft$.next('Draft v2');
    }, 500);

    this.schedule(() => {
      this.addLog('Save click stream emitted.');
      saveClick$.next();
    }, 1000);

    this.schedule(() => {
      this.addLog('Draft stream emitted "Draft v3" without saving.');
      draft$.next('Draft v3');
    }, 1500);

    this.schedule(() => {
      this.addLog('Save click stream emitted again.');
      saveClick$.next();
    }, 2000);
  }

  protected runForkJoinDemo(): void {
    this.startDemo('forkJoin');

    this.activeSubscription.add(
      forkJoin({
        permissions: this.fakeBackendRequest('Permissions loaded', 900),
        profile: this.fakeBackendRequest('Profile loaded', 500),
        settings: this.fakeBackendRequest('Settings loaded', 1200),
      }).subscribe((response) => {
        const readyMessage = [
          response.profile,
          response.permissions,
          response.settings,
        ].join(' + ');

        this.results.set([readyMessage]);
        this.addLog('forkJoin emitted once after every backend stream completed.');
      }),
    );
  }

  protected reset(): void {
    this.startDemo('None');
    this.logs.set([
      'Choose a combining demo to see how multiple streams work together.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private clearTimers(): void {
    while (this.timerIds.length > 0) {
      const timerId = this.timerIds.pop();

      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
    }
  }

  private fakeBackendRequest(label: string, delayMs: number): Observable<string> {
    return of(label).pipe(
      tap(() => this.addLog(`${label} request started.`)),
      delay(delayMs),
      tap(() => this.addLog(`${label} request completed.`)),
    );
  }

  private schedule(callback: () => void, delayMs: number): void {
    const timerId = window.setTimeout(callback, delayMs);

    this.timerIds.push(timerId);
  }

  private startDemo(name: string): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
    this.activeSubscription = new Subscription();
    this.activeDemo.set(name);
    this.results.set([]);
    this.logs.set([`Starting ${name} demo.`]);
  }
}

import { Component, OnDestroy, signal } from '@angular/core';
import { catchError, finalize, Observable, of, retry, Subscription, tap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface ErrorOperator {
  description: string;
  name: string;
  realWorldUse: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-06-error-handling',
  imports: [LearningNav],
  templateUrl: './lesson-06-error-handling.html',
  styleUrl: './lesson-06-error-handling.css',
})
export class Lesson06ErrorHandling implements OnDestroy {
  private activeSubscription = new Subscription();

  protected readonly activeDemo = signal('None');
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(false);
  protected readonly result = signal('No result yet.');
  protected readonly logs = signal<string[]>([
    'Choose an error handling demo to start a fake backend request.',
  ]);

  protected readonly operators: ErrorOperator[] = [
    {
      description:
        'Catches an error and returns a replacement Observable, often a fallback value.',
      name: 'catchError',
      realWorldUse: 'Show cached data or a friendly empty state after a failed request.',
      syntax: 'catchError(() => of(fallbackValue))',
    },
    {
      description:
        'Resubscribes to the source when it errors, up to the number you provide.',
      name: 'retry',
      realWorldUse: 'Try a flaky request again before showing an error.',
      syntax: 'retry(2)',
    },
    {
      description:
        'Runs cleanup when the Observable completes, errors, or is unsubscribed.',
      name: 'finalize',
      realWorldUse: 'Turn off loading no matter how the request ends.',
      syntax: 'finalize(() => setLoading(false))',
    },
  ];

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }

  protected runSuccessDemo(): void {
    this.startDemo('success');

    this.activeSubscription.add(
      this.fakeBackendRequest('Profile loaded', 0)
        .pipe(
          tap((value) => this.addLog(`tap saw successful value "${value}".`)),
          finalize(() => this.finishLoading('success request')),
        )
        .subscribe({
          error: (error: Error) => this.showError(error.message),
          next: (value) => this.showResult(value),
        }),
    );
  }

  protected runCatchErrorDemo(): void {
    this.startDemo('catchError');

    this.activeSubscription.add(
      this.fakeBackendRequest('Profile loaded', 1)
        .pipe(
          catchError((error: Error) => {
            this.addLog(`catchError caught "${error.message}".`);

            return of('Fallback profile from cache');
          }),
          finalize(() => this.finishLoading('catchError request')),
        )
        .subscribe({
          error: (error: Error) => this.showError(error.message),
          next: (value) => this.showResult(value),
        }),
    );
  }

  protected runRetryDemo(): void {
    this.startDemo('retry');

    this.activeSubscription.add(
      this.fakeBackendRequest('Profile loaded after retry', 2)
        .pipe(
          retry(2),
          catchError((error: Error) => {
            this.addLog(`catchError handled final retry error "${error.message}".`);

            return of('Could not load profile after retry');
          }),
          finalize(() => this.finishLoading('retry request')),
        )
        .subscribe((value) => this.showResult(value)),
    );
  }

  protected reset(): void {
    this.startDemo('None');
    this.loading.set(false);
    this.logs.set([
      'Choose an error handling demo to start a fake backend request.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private fakeBackendRequest(
    successValue: string,
    failuresBeforeSuccess: number,
  ): Observable<string> {
    let attempt = 0;

    return new Observable<string>((observer) => {
      attempt += 1;
      this.addLog(`Backend attempt ${attempt} started.`);

      const timerId = window.setTimeout(() => {
        if (attempt <= failuresBeforeSuccess) {
          observer.error(new Error(`Request failed on attempt ${attempt}`));
          return;
        }

        observer.next(successValue);
        observer.complete();
      }, 500);

      return () => window.clearTimeout(timerId);
    });
  }

  private finishLoading(label: string): void {
    this.loading.set(false);
    this.addLog(`finalize ran for ${label}; loading is now false.`);
  }

  private showError(message: string): void {
    this.error.set(message);
    this.addLog(`Subscriber error handler received "${message}".`);
  }

  private showResult(value: string): void {
    this.result.set(value);
    this.error.set(null);
    this.addLog(`Subscriber received "${value}".`);
  }

  private startDemo(name: string): void {
    this.activeSubscription.unsubscribe();
    this.activeSubscription = new Subscription();
    this.activeDemo.set(name);
    this.error.set(null);
    this.loading.set(true);
    this.result.set('Waiting for request result...');
    this.logs.set([`Starting ${name} demo.`]);
  }
}

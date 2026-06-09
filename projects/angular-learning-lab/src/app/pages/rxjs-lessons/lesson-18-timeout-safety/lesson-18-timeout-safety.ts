import { Component, OnDestroy, signal } from '@angular/core';
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subscription,
  timeout,
  TimeoutError,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type RequestKind = 'fast' | 'hanging' | 'slow';

interface RequestState {
  error: string | null;
  loading: boolean;
  result: string | null;
  source: string;
}

@Component({
  selector: 'app-lesson-18-timeout-safety',
  imports: [LearningNav],
  templateUrl: './lesson-18-timeout-safety.html',
  styleUrl: './lesson-18-timeout-safety.css',
})
export class Lesson18TimeoutSafety implements OnDestroy {
  private activeRequest: Subscription | null = null;

  protected readonly logs = signal<string[]>([
    'Choose a request to see how timeout protects the UI.',
  ]);
  protected readonly state = signal<RequestState>({
    error: null,
    loading: false,
    result: null,
    source: 'No request yet',
  });

  protected readonly examples = [
    {
      description: 'Completes before the timeout window.',
      name: 'Fast request',
      syntax: 'api$.pipe(timeout(1200))',
    },
    {
      description: 'Emits too late, so timeout sends the stream to catchError.',
      name: 'Slow request',
      syntax: 'api$.pipe(timeout({ first: 1200 }))',
    },
    {
      description: 'Never emits, so timeout prevents endless loading.',
      name: 'Hanging request',
      syntax: 'api$.pipe(timeout(1200), catchError(...))',
    },
  ];

  ngOnDestroy(): void {
    this.activeRequest?.unsubscribe();
  }

  protected runRequest(kind: RequestKind): void {
    this.activeRequest?.unsubscribe();
    this.state.set({
      error: null,
      loading: true,
      result: null,
      source: `${kind} request`,
    });
    this.addLog(`${kind} request started.`);

    this.activeRequest = this.fakeBackend(kind)
      .pipe(
        timeout({ first: 1200 }),
        map((result) => ({
          error: null,
          loading: false,
          result,
          source: `${kind} request`,
        })),
        catchError((error: unknown) =>
          of({
            error:
              error instanceof TimeoutError
                ? 'Request timed out after 1.2 seconds.'
                : 'Request failed.',
            loading: false,
            result: null,
            source: `${kind} request`,
          }),
        ),
        finalize(() => this.addLog(`${kind} request stream ended.`)),
      )
      .subscribe((state) => {
        this.state.set(state);
        this.addLog(
          state.error ? `${kind} request showed an error.` : `${kind} request returned data.`,
        );
      });
  }

  protected reset(): void {
    this.activeRequest?.unsubscribe();
    this.activeRequest = null;
    this.logs.set(['Choose a request to see how timeout protects the UI.']);
    this.state.set({
      error: null,
      loading: false,
      result: null,
      source: 'No request yet',
    });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private fakeBackend(kind: RequestKind): Observable<string> {
    return new Observable<string>((observer) => {
      if (kind === 'hanging') {
        return () => this.addLog('Hanging backend was unsubscribed.');
      }

      const delayMs = kind === 'fast' ? 450 : 1900;
      const timerId = window.setTimeout(() => {
        observer.next(`Loaded profile data from ${kind} backend.`);
        observer.complete();
      }, delayMs);

      return () => window.clearTimeout(timerId);
    });
  }
}

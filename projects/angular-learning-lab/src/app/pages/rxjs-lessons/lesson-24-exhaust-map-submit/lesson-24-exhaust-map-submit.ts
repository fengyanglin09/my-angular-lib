import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  catchError,
  concat,
  exhaustMap,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface SubmitRequest {
  label: string;
  shouldFail: boolean;
}

interface SubmitState {
  confirmation: string | null;
  error: string | null;
  loading: boolean;
  source: string;
}

@Component({
  selector: 'app-lesson-24-exhaust-map-submit',
  imports: [AsyncPipe, LearningNav],
  templateUrl: './lesson-24-exhaust-map-submit.html',
  styleUrl: './lesson-24-exhaust-map-submit.css',
})
export class Lesson24ExhaustMapSubmit {
  private requestCount = 0;
  private clickCount = 0;
  private saveInFlight = false;
  private readonly submitClicks$ = new Subject<SubmitRequest>();

  protected readonly logs = signal<string[]>([
    'Click "Double click save" to emit two submit triggers quickly.',
  ]);

  protected readonly submitState$ = this.submitClicks$.pipe(
    exhaustMap((request) => {
      this.saveInFlight = true;
      this.addLog(`${request.label} accepted by exhaustMap.`);

      return concat(
        of<SubmitState>({
          confirmation: null,
          error: null,
          loading: true,
          source: request.label,
        }),
        this.saveOrder(request).pipe(
          map((confirmation) => ({
            confirmation,
            error: null,
            loading: false,
            source: request.label,
          })),
          catchError((error: Error) =>
            of<SubmitState>({
              confirmation: null,
              error: error.message,
              loading: false,
              source: request.label,
            }),
          ),
          finalize(() => {
            this.saveInFlight = false;
          }),
        ),
      );
    }),
    startWith({
      confirmation: null,
      error: null,
      loading: false,
      source: 'Waiting for submit',
    } satisfies SubmitState),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly codeSteps = [
    {
      description: 'A Subject represents button clicks from the component.',
      name: 'submit trigger',
      syntax: 'private readonly submitClicks$ = new Subject<SubmitRequest>();',
    },
    {
      description: 'exhaustMap accepts the first click and ignores later clicks while the request is active.',
      name: 'duplicate guard',
      syntax: 'submitClicks$.pipe(exhaustMap((request) => saveOrder(request)))',
    },
    {
      description: 'concat emits a loading state first, then emits success or failure.',
      name: 'state sequence',
      syntax: 'concat(of(loadingState), saveOrder(request).pipe(...))',
    },
  ];

  protected submitSave(): void {
    this.emitSubmit({ label: 'Single save click', shouldFail: false });
  }

  protected submitFailure(): void {
    this.emitSubmit({ label: 'Single failing save click', shouldFail: true });
  }

  protected submitTwice(): void {
    this.emitSubmit({ label: 'Rapid save click #1', shouldFail: false });
    this.emitSubmit({ label: 'Rapid save click #2', shouldFail: false });
  }

  protected clearLog(): void {
    this.logs.set([
      this.saveInFlight
        ? 'Log cleared. A save is still running, so the next click will be ignored until it finishes.'
        : 'Log cleared. Counters reset. Try "Emit two rapid save clicks".',
    ]);
    this.clickCount = 0;
    this.requestCount = this.saveInFlight ? this.requestCount : 0;
  }

  private emitSubmit(request: SubmitRequest): void {
    this.clickCount += 1;
    this.addLog(`Click trigger #${this.clickCount} emitted: ${request.label}.`);
    if (this.saveInFlight) {
      this.addLog(`${request.label} ignored because a save request is already running.`);
    }
    this.submitClicks$.next(request);
  }

  private saveOrder(request: SubmitRequest): Observable<string> {
    return new Observable<string>((observer) => {
      this.requestCount += 1;
      const requestId = this.requestCount;

      this.addLog(`${request.label}: backend save #${requestId} started.`);

      const timerId = window.setTimeout(() => {
        if (request.shouldFail) {
          observer.error(new Error(`Backend save #${requestId} failed.`));
          return;
        }

        observer.next(`Order saved by backend request #${requestId}`);
        observer.complete();
        this.addLog(`${request.label}: backend save #${requestId} completed.`);
      }, 1200);

      return () => window.clearTimeout(timerId);
    });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

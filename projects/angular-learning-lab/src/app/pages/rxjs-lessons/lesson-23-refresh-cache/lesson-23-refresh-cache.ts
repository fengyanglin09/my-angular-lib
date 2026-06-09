import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import {
  catchError,
  concat,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface UserProfile {
  id: number;
  name: string;
  role: string;
  refreshedAt: string;
}

interface ProfileState {
  error: string | null;
  loading: boolean;
  profile: UserProfile | null;
  source: string;
}

@Component({
  selector: 'app-lesson-23-refresh-cache',
  imports: [AsyncPipe, LearningNav],
  templateUrl: './lesson-23-refresh-cache.html',
  styleUrl: './lesson-23-refresh-cache.css',
})
export class Lesson23RefreshCache implements OnDestroy {
  private requestCount = 0;
  private lateSubscriberCount = 0;
  private lateSubscriptions = new Subscription();
  private readonly refresh$ = new Subject<{ label: string; shouldFail: boolean }>();

  protected readonly logs = signal<string[]>([
    'The template subscribes with async pipe, so startWith triggers the first load.',
  ]);
  protected readonly lateSubscriberLogs = signal<string[]>([
    'Click "Add late subscriber" after a load finishes.',
  ]);

  protected readonly profileState$ = this.refresh$.pipe(
    startWith({ label: 'Initial load', shouldFail: false }),
    switchMap((request) => {
      this.addLog(`${request.label}: refresh trigger emitted.`);

      return concat(
        of<ProfileState>({
          error: null,
          loading: true,
          profile: null,
          source: request.label,
        }),
        this.fetchProfile(request.label, request.shouldFail).pipe(
          map((profile) => ({
            error: null,
            loading: false,
            profile,
            source: request.label,
          })),
          catchError((error: Error) =>
            of<ProfileState>({
              error: error.message,
              loading: false,
              profile: null,
              source: request.label,
            }),
          ),
        ),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly codeSteps = [
    {
      description: 'A Subject acts like a reload button. It does not store the profile.',
      name: 'reload trigger',
      syntax: 'private readonly refresh$ = new Subject<void>();',
    },
    {
      description: 'startWith makes the stream load once when the first subscriber appears.',
      name: 'initial load',
      syntax: 'refresh$.pipe(startWith(undefined), ...)',
    },
    {
      description: 'switchMap turns each refresh event into a fresh backend request.',
      name: 'backend call',
      syntax: 'switchMap(() => http.get<UserProfile>(url))',
    },
    {
      description: 'shareReplay caches the latest result for the template and late subscribers.',
      name: 'shared cache',
      syntax: 'shareReplay({ bufferSize: 1, refCount: true })',
    },
  ];

  ngOnDestroy(): void {
    this.lateSubscriptions.unsubscribe();
  }

  protected refreshProfile(): void {
    this.refresh$.next({ label: 'Manual refresh', shouldFail: false });
  }

  protected failRefresh(): void {
    this.refresh$.next({ label: 'Failing refresh', shouldFail: true });
  }

  protected addLateSubscriber(): void {
    this.lateSubscriberCount += 1;
    const label = `Late subscriber ${this.lateSubscriberCount}`;

    this.addLateSubscriberLog(`${label} subscribed to profileState$.`);
    this.lateSubscriptions.add(
      this.profileState$.subscribe((state) => {
        if (state.loading) {
          this.addLateSubscriberLog(`${label} received loading state from ${state.source}.`);
          return;
        }

        if (state.error) {
          this.addLateSubscriberLog(`${label} received error "${state.error}".`);
          return;
        }

        this.addLateSubscriberLog(
          `${label} received cached profile from ${state.profile?.refreshedAt}.`,
        );
      }),
    );
  }

  protected resetLateSubscribers(): void {
    this.lateSubscriptions.unsubscribe();
    this.lateSubscriptions = new Subscription();
    this.lateSubscriberCount = 0;
    this.lateSubscriberLogs.set(['Late subscribers were unsubscribed.']);
  }

  private fetchProfile(label: string, shouldFail: boolean): Observable<UserProfile> {
    return new Observable<UserProfile>((observer) => {
      this.requestCount += 1;
      const requestId = this.requestCount;

      this.addLog(`${label}: backend request #${requestId} started.`);

      const timerId = window.setTimeout(() => {
        if (shouldFail) {
          observer.error(new Error(`Request #${requestId} failed on purpose.`));
          return;
        }

        observer.next({
          id: 42,
          name: 'Avery Chen',
          refreshedAt: `request #${requestId}`,
          role: requestId % 2 === 0 ? 'Editor' : 'Admin',
        });
        observer.complete();
        this.addLog(`${label}: backend request #${requestId} completed.`);
      }, 800);

      return () => window.clearTimeout(timerId);
    });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private addLateSubscriberLog(message: string): void {
    this.lateSubscriberLogs.update((logs) => [...logs, message]);
  }
}

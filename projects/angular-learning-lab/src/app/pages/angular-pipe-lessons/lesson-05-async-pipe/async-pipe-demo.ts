import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, concat, map, of, startWith, switchMap, timer } from 'rxjs';

interface ProfileState {
  error: string | null;
  loading: boolean;
  profile: {
    name: string;
    plan: string;
    refreshedAt: string;
  } | null;
  source: string;
}

@Component({
  selector: 'app-async-pipe-demo',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './async-pipe-demo.html',
  styleUrl: './async-pipe-demo.css',
})
export class AsyncPipeDemo {
  private readonly reloadRequests = new Subject<{
    label: string;
    shouldFail: boolean;
  }>();

  protected readonly profileState$ = this.reloadRequests.pipe(
    startWith({ label: 'Initial load', shouldFail: false }),
    switchMap((request) =>
      concat(
        of<ProfileState>({
          error: null,
          loading: true,
          profile: null,
          source: request.label,
        }),
        timer(650).pipe(
          map(() => {
            if (request.shouldFail) {
              return {
                error: 'Profile API failed for this demo request.',
                loading: false,
                profile: null,
                source: request.label,
              } satisfies ProfileState;
            }

            return {
              error: null,
              loading: false,
              profile: {
                name: 'Mark Lin',
                plan: 'Angular Learning Lab',
                refreshedAt: new Date().toLocaleTimeString(),
              },
              source: request.label,
            } satisfies ProfileState;
          })
        )
      )
    )
  );

  protected reloadProfile(): void {
    this.reloadRequests.next({ label: 'Manual reload', shouldFail: false });
  }

  protected failProfile(): void {
    this.reloadRequests.next({ label: 'Failing reload', shouldFail: true });
  }
}

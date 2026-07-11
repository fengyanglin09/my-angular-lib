import { JsonPipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concat, interval, map, Observable, of, take } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface UploadState {
  done: boolean;
  eventName: string;
  percent: number;
}

interface DemoUploadEvent {
  loaded: number;
  total: number;
  type: HttpEventType.Sent | HttpEventType.UploadProgress | HttpEventType.Response;
}

@Component({
  selector: 'app-lesson-08-progress-events',
  imports: [JsonPipe, LearningNav],
  templateUrl: './lesson-08-progress-events.html',
  styleUrl: './lesson-08-progress-events.css',
})
export class Lesson08ProgressEvents {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly state = signal<UploadState>({
    done: false,
    eventName: 'Waiting',
    percent: 0,
  });
  protected readonly events = signal<DemoUploadEvent[]>([]);

  protected readonly codeSteps = [
    {
      name: 'Request options',
      syntax: `http.post(url, formData, {
  reportProgress: true,
  observe: 'events',
})`,
    },
    {
      name: 'Progress event',
      syntax: `if (event.type === HttpEventType.UploadProgress) {
  const percent = Math.round(100 * event.loaded / event.total);
}`,
    },
    {
      name: 'Final response',
      syntax: `if (event.type === HttpEventType.Response) {
  // upload is complete
}`,
    },
  ];

  protected startUpload(): void {
    this.state.set({
      done: false,
      eventName: 'Sent',
      percent: 0,
    });
    this.events.set([]);

    this.fakeUploadEvents().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((event) => {
      this.events.update((events) => [event, ...events].slice(0, 8));
      this.state.set(this.toState(event));
    });
  }

  private fakeUploadEvents(): Observable<DemoUploadEvent> {
    const total = 1000;

    return concat(
      of({ loaded: 0, total, type: HttpEventType.Sent as const }),
      interval(250).pipe(
        take(5),
        map((index) => ({
          loaded: (index + 1) * 200,
          total,
          type: HttpEventType.UploadProgress as const,
        })),
      ),
      of({ loaded: total, total, type: HttpEventType.Response as const }),
    );
  }

  private toState(event: DemoUploadEvent): UploadState {
    if (event.type === HttpEventType.Response) {
      return {
        done: true,
        eventName: 'Response',
        percent: 100,
      };
    }

    if (event.type === HttpEventType.UploadProgress) {
      return {
        done: false,
        eventName: 'UploadProgress',
        percent: Math.round((event.loaded / event.total) * 100),
      };
    }

    return {
      done: false,
      eventName: 'Sent',
      percent: 0,
    };
  }
}

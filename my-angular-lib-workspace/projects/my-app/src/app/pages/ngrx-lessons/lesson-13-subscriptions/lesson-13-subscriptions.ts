import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  LessonRouteState,
  selectLessonMode,
  selectLessonRouteState,
  selectLessonTopic,
  selectUrl,
} from '../../../state/router/router.selectors';

interface SubscriptionLog {
  id: number;
  message: string;
  url: string;
}

@Component({
  selector: 'app-lesson-13-subscriptions',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-13-subscriptions.html',
  styleUrl: './lesson-13-subscriptions.css',
})
export class Lesson13Subscriptions implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  protected readonly mode = this.store.selectSignal(selectLessonMode);
  protected readonly topic = this.store.selectSignal(selectLessonTopic);
  protected readonly url = this.store.selectSignal(selectUrl);

  protected logs: SubscriptionLog[] = [];

  private nextLogId = 1;

  ngOnInit(): void {
    this.store
      .select(selectLessonRouteState)
      .pipe(
        filter((routeState): routeState is LessonRouteState => routeState !== null),
        distinctUntilChanged(
          (previous, current) =>
            previous.topic === current.topic && previous.mode === current.mode,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ mode, topic, url }) => {
        this.logs = [
          {
            id: this.nextLogId,
            message: `Subscription received topic "${topic}" with mode "${mode}"`,
            url,
          },
          ...this.logs,
        ].slice(0, 6);

        this.nextLogId += 1;
      });
  }

  protected clearLogs(): void {
    this.logs = [];
    this.nextLogId = 1;
  }
}

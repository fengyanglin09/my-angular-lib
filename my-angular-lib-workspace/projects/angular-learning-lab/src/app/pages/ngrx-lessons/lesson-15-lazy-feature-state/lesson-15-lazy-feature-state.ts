import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { LessonProgressActions } from '../../../state/lesson-progress/lesson-progress.actions';
import {
  selectAllProgressItems,
  selectError,
  selectLoaded,
  selectLoading,
  selectProgressSummary,
} from '../../../state/lesson-progress/lesson-progress.selectors';

@Component({
  selector: 'app-lesson-15-lazy-feature-state',
  imports: [LearningNav],
  templateUrl: './lesson-15-lazy-feature-state.html',
  styleUrl: './lesson-15-lazy-feature-state.css',
})
export class Lesson15LazyFeatureState implements OnInit {
  private readonly store = inject(Store);

  protected readonly error = this.store.selectSignal(selectError);
  protected readonly items = this.store.selectSignal(selectAllProgressItems);
  protected readonly loaded = this.store.selectSignal(selectLoaded);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly summary = this.store.selectSignal(selectProgressSummary);

  ngOnInit(): void {
    this.store.dispatch(LessonProgressActions.loadProgress());
  }

  protected reload(): void {
    this.store.dispatch(LessonProgressActions.loadProgress());
  }

  protected toggleItem(id: number): void {
    this.store.dispatch(LessonProgressActions.toggleProgressItem({ id }));
  }
}

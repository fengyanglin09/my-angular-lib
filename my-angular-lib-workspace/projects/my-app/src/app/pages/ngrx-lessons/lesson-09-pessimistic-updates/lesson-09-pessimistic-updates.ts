import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { DraftsActions } from '../../../state/drafts/drafts.actions';
import { DraftIdea } from '../../../state/drafts/drafts.models';
import {
  selectAllDrafts,
  selectCreating,
  selectDraftsSummary,
  selectError,
  selectLoading,
  selectUpdatingIds,
} from '../../../state/drafts/drafts.selectors';

@Component({
  selector: 'app-lesson-09-pessimistic-updates',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-09-pessimistic-updates.html',
  styleUrl: './lesson-09-pessimistic-updates.css',
})
export class Lesson09PessimisticUpdates implements OnInit {
  private readonly store = inject(Store);

  protected readonly creating = this.store.selectSignal(selectCreating);
  protected readonly drafts = this.store.selectSignal(selectAllDrafts);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly summary = this.store.selectSignal(selectDraftsSummary);
  protected readonly updatingIds = this.store.selectSignal(selectUpdatingIds);
  protected category = 'NgRx';
  protected title = '';

  ngOnInit(): void {
    this.store.dispatch(DraftsActions.loadDrafts());
  }

  protected createDraft(shouldFail = false): void {
    const title = this.title.trim();
    const category = this.category.trim();

    if (!title || !category) {
      return;
    }

    this.store.dispatch(
      DraftsActions.createDraft({
        title,
        category,
        shouldFail,
      }),
    );

    if (!shouldFail) {
      this.title = '';
    }
  }

  protected isUpdating(id: number): boolean {
    return this.updatingIds().includes(id);
  }

  protected updateCategory(
    draft: DraftIdea,
    category: string,
    shouldFail = false,
  ): void {
    if (this.isUpdating(draft.id) || draft.category === category) {
      return;
    }

    this.store.dispatch(
      DraftsActions.updateDraftCategory({
        id: draft.id,
        category,
        shouldFail,
      }),
    );
  }
}

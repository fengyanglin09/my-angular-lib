import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { LibraryCatalogActions } from '../../../state/library-catalog/library-catalog.actions';
import {
  selectAllCatalogAuthors,
  selectCatalogBookViewModels,
  selectCatalogSummary,
  selectSelectedAuthorId,
} from '../../../state/library-catalog/library-catalog.selectors';

@Component({
  selector: 'app-lesson-25-normalized-state',
  imports: [LearningNav],
  templateUrl: './lesson-25-normalized-state.html',
  styleUrl: './lesson-25-normalized-state.css',
})
export class Lesson25NormalizedState {
  private readonly store = inject(Store);

  protected readonly authors = this.store.selectSignal(selectAllCatalogAuthors);
  protected readonly books = this.store.selectSignal(selectCatalogBookViewModels);
  protected readonly selectedAuthorId = this.store.selectSignal(selectSelectedAuthorId);
  protected readonly summary = this.store.selectSignal(selectCatalogSummary);

  protected selectAuthor(authorId: number | null): void {
    this.store.dispatch(LibraryCatalogActions.selectAuthor({ authorId }));
  }
}


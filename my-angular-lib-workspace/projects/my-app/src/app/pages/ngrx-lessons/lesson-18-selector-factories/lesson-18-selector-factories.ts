import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksActions } from '../../../state/books/books.actions';
import {
  selectBookById,
  selectBookLookupLabel,
  selectBooksByAuthor,
  selectBooksSummary,
  selectLoading,
} from '../../../state/books/books.selectors';

@Component({
  selector: 'app-lesson-18-selector-factories',
  imports: [LearningNav],
  templateUrl: './lesson-18-selector-factories.html',
  styleUrl: './lesson-18-selector-factories.css',
})
export class Lesson18SelectorFactories implements OnInit {
  private readonly store = inject(Store);

  protected readonly adaBooks = this.store.selectSignal(
    selectBooksByAuthor('Ada Weaver'),
  );
  protected readonly benBooks = this.store.selectSignal(
    selectBooksByAuthor('Ben Stream'),
  );
  protected readonly bookThree = this.store.selectSignal(selectBookById(3));
  protected readonly bookThreeLabel = this.store.selectSignal(selectBookLookupLabel(3));
  protected readonly bookTen = this.store.selectSignal(selectBookById(10));
  protected readonly bookTenLabel = this.store.selectSignal(selectBookLookupLabel(10));
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly summary = this.store.selectSignal(selectBooksSummary);

  ngOnInit(): void {
    this.loadPage(1);
  }

  protected loadPage(page: number): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page,
        pageSize: 12,
        shouldFail: false,
      }),
    );
  }

  protected toggleFavorite(id: number): void {
    this.store.dispatch(BooksActions.toggleFavorite({ id }));
  }
}

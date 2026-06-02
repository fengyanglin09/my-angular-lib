import { computed, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BooksActions } from './books.actions';
import {
  selectAllBooks,
  selectBooksSummary,
  selectError,
  selectLastSavedAt,
  selectLoading,
  selectPage,
  selectPageSize,
  selectSaveError,
  selectSaving,
  selectSelectedBook,
  selectTotalPages,
} from './books.selectors';

@Injectable({ providedIn: 'root' })
export class BooksFacade {
  private readonly store = inject(Store);

  readonly books = this.store.selectSignal(selectAllBooks);
  readonly canGoNext = computed(() => this.page() < this.totalPages());
  readonly canGoPrevious = computed(() => this.page() > 1);
  readonly error = this.store.selectSignal(selectError);
  readonly lastSavedAt = this.store.selectSignal(selectLastSavedAt);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly page = this.store.selectSignal(selectPage);
  readonly pageSize = this.store.selectSignal(selectPageSize);
  readonly saveError = this.store.selectSignal(selectSaveError);
  readonly saving = this.store.selectSignal(selectSaving);
  readonly selectedBook = this.store.selectSignal(selectSelectedBook);
  readonly summary = this.store.selectSignal(selectBooksSummary);
  readonly totalPages = this.store.selectSignal(selectTotalPages);

  addBook(title: string, author: string): void {
    this.store.dispatch(BooksActions.addBook({ title, author }));
  }

  loadCurrentPage(shouldFail = false): void {
    this.loadPage(this.page(), shouldFail);
  }

  loadPage(page: number, shouldFail = false): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page,
        pageSize: this.pageSize(),
        shouldFail,
      }),
    );
  }

  nextPage(): void {
    if (this.canGoNext()) {
      this.loadPage(this.page() + 1);
    }
  }

  previousPage(): void {
    if (this.canGoPrevious()) {
      this.loadPage(this.page() - 1);
    }
  }

  removeBook(id: number): void {
    this.store.dispatch(BooksActions.removeBook({ id }));
  }

  saveBooks(shouldFail = false): void {
    this.store.dispatch(BooksActions.saveBooks({ shouldFail }));
  }

  selectBook(id: number): void {
    this.store.dispatch(BooksActions.selectBook({ id }));
  }

  toggleFavorite(id: number): void {
    this.store.dispatch(BooksActions.toggleFavorite({ id }));
  }
}

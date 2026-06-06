import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksActions } from '../../../state/books/books.actions';
import {
  selectAllBooks,
  selectBooksSummary,
  selectError,
  selectLastSavedAt,
  selectLoading,
  selectPage,
  selectPageRange,
  selectPageSize,
  selectSaveError,
  selectSaving,
  selectSelectedBook,
  selectTotalPages,
} from '../../../state/books/books.selectors';

@Component({
  selector: 'app-lesson-04-entity-books',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-04-entity-books.html',
  styleUrl: './lesson-04-entity-books.css',
})
export class Lesson04EntityBooks implements OnInit {
  private readonly store = inject(Store);

  protected readonly books = this.store.selectSignal(selectAllBooks);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly lastSavedAt = this.store.selectSignal(selectLastSavedAt);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly page = this.store.selectSignal(selectPage);
  protected readonly pageRange = this.store.selectSignal(selectPageRange);
  protected readonly pageSize = this.store.selectSignal(selectPageSize);
  protected readonly saveError = this.store.selectSignal(selectSaveError);
  protected readonly saving = this.store.selectSignal(selectSaving);
  protected readonly selectedBook = this.store.selectSignal(selectSelectedBook);
  protected readonly summary = this.store.selectSignal(selectBooksSummary);
  protected readonly totalPages = this.store.selectSignal(selectTotalPages);
  protected newBookAuthor = '';
  protected newBookTitle = '';

  ngOnInit(): void {
    this.loadBooks(1);
  }

  protected loadBooks(page = this.page()): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page,
        pageSize: this.pageSize(),
        shouldFail: false,
      }),
    );
  }

  protected simulateFailure(): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page: this.page(),
        pageSize: this.pageSize(),
        shouldFail: true,
      }),
    );
  }

  protected previousPage(): void {
    this.loadBooks(Math.max(this.page() - 1, 1));
  }

  protected nextPage(): void {
    this.loadBooks(Math.min(this.page() + 1, this.totalPages()));
  }

  protected saveBooks(): void {
    this.store.dispatch(BooksActions.saveBooks({ shouldFail: false }));
  }

  protected simulateSaveFailure(): void {
    this.store.dispatch(BooksActions.saveBooks({ shouldFail: true }));
  }

  protected addBook(): void {
    const title = this.newBookTitle.trim();
    const author = this.newBookAuthor.trim();

    if (!title || !author) {
      return;
    }

    this.store.dispatch(BooksActions.addBook({ title, author }));
    this.newBookAuthor = '';
    this.newBookTitle = '';
  }

  protected selectBook(id: number): void {
    this.store.dispatch(BooksActions.selectBook({ id }));
  }

  protected toggleFavorite(id: number): void {
    this.store.dispatch(BooksActions.toggleFavorite({ id }));
  }

  protected removeBook(id: number): void {
    this.store.dispatch(BooksActions.removeBook({ id }));
  }
}

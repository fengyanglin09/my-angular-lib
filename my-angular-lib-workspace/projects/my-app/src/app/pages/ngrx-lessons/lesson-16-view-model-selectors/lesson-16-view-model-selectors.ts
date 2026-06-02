import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksActions } from '../../../state/books/books.actions';
import { selectBooksViewModel } from '../../../state/books/books.selectors';

@Component({
  selector: 'app-lesson-16-view-model-selectors',
  imports: [LearningNav],
  templateUrl: './lesson-16-view-model-selectors.html',
  styleUrl: './lesson-16-view-model-selectors.css',
})
export class Lesson16ViewModelSelectors implements OnInit {
  private readonly store = inject(Store);

  protected readonly vm = this.store.selectSignal(selectBooksViewModel);

  ngOnInit(): void {
    this.loadPage(1);
  }

  protected loadPage(page: number, shouldFail = false): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page,
        pageSize: 5,
        shouldFail,
      }),
    );
  }

  protected savePage(shouldFail = false): void {
    this.store.dispatch(BooksActions.saveBooks({ shouldFail }));
  }

  protected selectBook(id: number): void {
    this.store.dispatch(BooksActions.selectBook({ id }));
  }

  protected toggleFavorite(id: number): void {
    this.store.dispatch(BooksActions.toggleFavorite({ id }));
  }
}

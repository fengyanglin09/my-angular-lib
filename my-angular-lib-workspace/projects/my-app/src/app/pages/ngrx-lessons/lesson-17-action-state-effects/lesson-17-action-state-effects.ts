import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksActions } from '../../../state/books/books.actions';
import { selectBooksViewModel } from '../../../state/books/books.selectors';
import { SelectedBookNotesActions } from '../../../state/selected-book-notes/selected-book-notes.actions';
import {
  selectError,
  selectNotes,
  selectNotesSummary,
  selectSaving,
} from '../../../state/selected-book-notes/selected-book-notes.selectors';

@Component({
  selector: 'app-lesson-17-action-state-effects',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-17-action-state-effects.html',
  styleUrl: './lesson-17-action-state-effects.css',
})
export class Lesson17ActionStateEffects implements OnInit {
  private readonly store = inject(Store);

  protected readonly booksVm = this.store.selectSignal(selectBooksViewModel);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly notes = this.store.selectSignal(selectNotes);
  protected readonly notesSummary = this.store.selectSignal(selectNotesSummary);
  protected readonly saving = this.store.selectSignal(selectSaving);
  protected note = 'This selected book needs a follow-up example.';

  ngOnInit(): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        page: 1,
        pageSize: 5,
        shouldFail: false,
      }),
    );
  }

  protected saveNote(shouldFail = false): void {
    const note = this.note.trim();

    if (!note) {
      return;
    }

    this.store.dispatch(
      SelectedBookNotesActions.saveNoteForSelectedBook({
        note,
        shouldFail,
      }),
    );

    if (!shouldFail) {
      this.note = '';
    }
  }

  protected selectBook(id: number): void {
    this.store.dispatch(BooksActions.selectBook({ id }));
  }
}

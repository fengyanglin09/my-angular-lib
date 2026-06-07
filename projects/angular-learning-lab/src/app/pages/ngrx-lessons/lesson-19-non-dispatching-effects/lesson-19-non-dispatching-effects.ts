import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksActions } from '../../../state/books/books.actions';
import { selectBooksViewModel } from '../../../state/books/books.selectors';
import { SelectedBookNotesActions } from '../../../state/selected-book-notes/selected-book-notes.actions';
import { SelectedBookNotesNotifications } from '../../../state/selected-book-notes/selected-book-notes-notifications';
import { selectSaving } from '../../../state/selected-book-notes/selected-book-notes.selectors';

@Component({
  selector: 'app-lesson-19-non-dispatching-effects',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-19-non-dispatching-effects.html',
  styleUrl: './lesson-19-non-dispatching-effects.css',
})
export class Lesson19NonDispatchingEffects implements OnInit {
  private readonly notificationsService = inject(SelectedBookNotesNotifications);
  private readonly store = inject(Store);

  protected readonly booksVm = this.store.selectSignal(selectBooksViewModel);
  protected readonly notifications = this.notificationsService.notifications;
  protected readonly saving = this.store.selectSignal(selectSaving);
  protected note = 'Show a toast from a non-dispatching effect.';

  ngOnInit(): void {
    this.notificationsService.clear();
    this.store.dispatch(
      BooksActions.loadBooks({
        page: 1,
        pageSize: 5,
        shouldFail: false,
      }),
    );
  }

  protected clearNotifications(): void {
    this.notificationsService.clear();
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
  }

  protected selectBook(id: number): void {
    this.store.dispatch(BooksActions.selectBook({ id }));
  }
}

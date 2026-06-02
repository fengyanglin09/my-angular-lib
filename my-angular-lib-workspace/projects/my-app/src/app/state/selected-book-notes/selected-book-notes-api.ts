import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { Book } from '../books/books.models';
import { SavedBookNote } from './selected-book-notes.models';

@Injectable({ providedIn: 'root' })
export class SelectedBookNotesApi {
  private nextId = 1;

  saveNote(
    book: Book,
    note: string,
    shouldFail: boolean,
  ): Observable<SavedBookNote> {
    if (shouldFail) {
      return throwError(() => new Error(`Could not save a note for ${book.title}`)).pipe(
        delay(650),
      );
    }

    const savedNote: SavedBookNote = {
      id: this.nextId,
      bookId: book.id,
      bookTitle: book.title,
      note,
      savedAt: new Date().toLocaleTimeString(),
    };

    this.nextId += 1;

    return of(savedNote).pipe(delay(650));
  }
}

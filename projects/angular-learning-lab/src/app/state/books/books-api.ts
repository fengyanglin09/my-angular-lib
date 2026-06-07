import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { remoteBooks } from './books.reducer';
import { Book } from './books.models';

export interface BooksPage {
  books: Book[];
  page: number;
  pageSize: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class BooksApi {
  loadBooks(page: number, pageSize: number, shouldFail: boolean): Observable<BooksPage> {
    if (shouldFail) {
      return throwError(() => new Error('Could not load the book shelf')).pipe(delay(600));
    }

    const start = (page - 1) * pageSize;
    const books = remoteBooks.slice(start, start + pageSize);

    return of({
      books,
      page,
      pageSize,
      total: remoteBooks.length,
    }).pipe(delay(600));
  }

  saveBooks(books: Book[], shouldFail: boolean): Observable<{ savedAt: string }> {
    if (shouldFail) {
      return throwError(() => new Error('Could not save the book shelf')).pipe(delay(600));
    }

    console.table(books);
    return of({ savedAt: new Date().toLocaleTimeString() }).pipe(delay(600));
  }
}

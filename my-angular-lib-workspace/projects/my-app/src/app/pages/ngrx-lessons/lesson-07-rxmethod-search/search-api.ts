import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { SearchResult } from './search-result.models';

const searchIndex: SearchResult[] = [
  { id: 1, title: 'Angular signals guide', category: 'Angular', minutes: 18 },
  { id: 2, title: 'NgRx Store fundamentals', category: 'NgRx', minutes: 32 },
  { id: 3, title: 'NgRx Entity adapter recipes', category: 'NgRx', minutes: 26 },
  { id: 4, title: 'Signal Store backend loading', category: 'NgRx', minutes: 24 },
  { id: 5, title: 'RxJS switchMap for search', category: 'RxJS', minutes: 20 },
  { id: 6, title: 'Route params and page stores', category: 'Angular', minutes: 22 },
  { id: 7, title: 'Effects success and failure actions', category: 'NgRx', minutes: 28 },
  { id: 8, title: 'Component forms with signals', category: 'Angular', minutes: 16 },
  { id: 9, title: 'Pagination state patterns', category: 'Architecture', minutes: 30 },
  { id: 10, title: 'Optimistic update tradeoffs', category: 'Architecture', minutes: 34 },
];

@Injectable({ providedIn: 'root' })
export class SearchApi {
  searchLessons(query: string): Observable<SearchResult[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === 'error') {
      return throwError(() => new Error('Search service is unavailable')).pipe(delay(500));
    }

    if (!normalizedQuery) {
      return of([]).pipe(delay(250));
    }

    const results = searchIndex.filter((item) => {
      const searchableText = `${item.title} ${item.category}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    return of(results).pipe(delay(500));
  }
}

import { Component, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  concat,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface SearchResult {
  category: string;
  title: string;
}

interface SearchState {
  error: string | null;
  loading: boolean;
  query: string;
  results: SearchResult[];
}

@Component({
  selector: 'app-lesson-07-rxjs-interop',
  imports: [LearningNav],
  templateUrl: './lesson-07-rxjs-interop.html',
  styleUrl: './lesson-07-rxjs-interop.css',
})
export class Lesson07RxjsInterop {
  protected readonly query = signal('');
  protected readonly logs = signal<string[]>([
    'Type a search term. The signal is converted to an Observable for debounce and backend-style loading.',
  ]);

  private readonly query$ = toObservable(this.query);

  protected readonly searchState = toSignal(
    this.query$.pipe(
      map((query) => query.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      tap((query) => this.addLog(`toObservable emitted "${query || 'empty'}".`)),
      switchMap((query) => {
        if (!query) {
          return of<SearchState>({
            error: null,
            loading: false,
            query,
            results: [],
          });
        }

        return concat(
          of<SearchState>({
            error: null,
            loading: true,
            query,
            results: [],
          }),
          this.searchLessons(query).pipe(
            map((results) => ({
              error: null,
              loading: false,
              query,
              results,
            })),
            catchError((error: Error) =>
              of<SearchState>({
                error: error.message,
                loading: false,
                query,
                results: [],
              }),
            ),
          ),
        );
      }),
    ),
    {
      initialValue: {
        error: null,
        loading: false,
        query: '',
        results: [],
      },
    },
  );

  protected readonly resultSummary = computed(() => {
    const state = this.searchState();

    if (state.loading) {
      return `Searching for "${state.query}"`;
    }

    if (state.error) {
      return state.error;
    }

    if (!state.query) {
      return 'Waiting for a search term';
    }

    return `${state.results.length} result(s) for "${state.query}"`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The input field writes to normal signal state.',
      name: 'signal state',
      syntax: 'query = signal("");',
    },
    {
      description: 'toObservable lets RxJS operators react to signal changes.',
      name: 'signal to stream',
      syntax: 'query$ = toObservable(query);',
    },
    {
      description: 'RxJS handles debounce, duplicate skipping, and async backend work.',
      name: 'rxjs pipeline',
      syntax: 'query$.pipe(debounceTime(350), switchMap(searchApi))',
    },
    {
      description: 'toSignal returns the async result to the template as signal state.',
      name: 'stream to signal',
      syntax: 'searchState = toSignal(results$, { initialValue });',
    },
  ];

  protected updateQuery(value: string): void {
    this.query.set(value);
  }

  protected runExample(query: string): void {
    this.query.set(query);
  }

  protected clearSearch(): void {
    this.query.set('');
    this.logs.set(['Search cleared. Type again to restart the interop pipeline.']);
  }

  private searchLessons(query: string): Observable<SearchResult[]> {
    const catalog: SearchResult[] = [
      { category: 'Signals', title: 'Signal Basics' },
      { category: 'Signals', title: 'Effect Cleanup' },
      { category: 'Signals', title: 'Model Signals' },
      { category: 'RxJS', title: 'switchMap Search' },
      { category: 'RxJS', title: 'shareReplay Cache' },
      { category: 'NgRx', title: 'Entity Adapter Books' },
      { category: 'NgRx', title: 'Router Store Selectors' },
    ];

    return new Observable<SearchResult[]>((observer) => {
      this.addLog(`Backend search started for "${query}".`);

      const timerId = window.setTimeout(() => {
        if (query.toLowerCase() === 'error') {
          observer.error(new Error('Backend search failed for demo purposes.'));
          return;
        }

        const normalizedQuery = query.toLowerCase();
        const results = catalog.filter(
          (item) =>
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.category.toLowerCase().includes(normalizedQuery),
        );

        observer.next(results);
        observer.complete();
        this.addLog(`Backend search completed for "${query}".`);
      }, 700);

      return () => window.clearTimeout(timerId);
    });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

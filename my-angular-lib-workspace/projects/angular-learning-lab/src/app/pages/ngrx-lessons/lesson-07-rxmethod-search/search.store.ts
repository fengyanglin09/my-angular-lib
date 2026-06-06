import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

import { SearchApi } from './search-api';
import { SearchResult } from './search-result.models';

interface SearchState {
  error: string | null;
  loading: boolean;
  query: string;
  results: SearchResult[];
}

export const SearchStore = signalStore(
  withState<SearchState>({
    error: null,
    loading: false,
    query: '',
    results: [],
  }),
  withComputed(({ query, results }) => ({
    hasQuery: computed(() => query().trim().length > 0),
    resultSummary: computed(() => {
      const count = results().length;

      if (!query().trim()) {
        return 'Type to search backend lessons';
      }

      return `${count} result${count === 1 ? '' : 's'} for "${query()}"`;
    }),
  })),
  withMethods((store) => {
    const searchApi = inject(SearchApi);

    return {
      clear(): void {
        patchState(store, {
          error: null,
          loading: false,
          query: '',
          results: [],
        });
      },
      search: rxMethod<string>((query$) =>
        query$.pipe(
          tap((query) =>
            patchState(store, {
              error: null,
              query,
            }),
          ),
          debounceTime(300),
          distinctUntilChanged(),
          tap((query) =>
            patchState(store, {
              loading: query.trim().length > 0,
              results: query.trim().length > 0 ? store.results() : [],
            }),
          ),
          switchMap((query) =>
            searchApi.searchLessons(query).pipe(
              tap((results) =>
                patchState(store, {
                  error: null,
                  loading: false,
                  results,
                }),
              ),
              catchError((error: Error) => {
                patchState(store, {
                  error: error.message,
                  loading: false,
                  results: [],
                });

                return of(null);
              }),
            ),
          ),
        ),
      ),
    };
  }),
);

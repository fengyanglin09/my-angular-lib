import { createSelector } from '@ngrx/store';

import { booksAdapter, booksFeature } from './books.reducer';
import { Book } from './books.models';

export const { selectBooksState, selectSelectedBookId } = booksFeature;
export const {
  selectError,
  selectLastSavedAt,
  selectLoading,
  selectPage,
  selectPageSize,
  selectSaveError,
  selectSaving,
  selectTotal,
} = booksFeature;

const adapterSelectors = booksAdapter.getSelectors();

export const selectAllBooks = createSelector(
  selectBooksState,
  adapterSelectors.selectAll,
);

export const selectBookEntities = createSelector(
  selectBooksState,
  adapterSelectors.selectEntities,
);

export const selectTotalBooks = createSelector(
  selectBooksState,
  adapterSelectors.selectTotal,
);

export const selectTotalPages = createSelector(
  selectTotal,
  selectPageSize,
  (total, pageSize) => Math.max(Math.ceil(total / pageSize), 1),
);

export const selectPageRange = createSelector(
  selectPage,
  selectPageSize,
  selectTotal,
  (page, pageSize, total) => {
    if (total === 0) {
      return '0 of 0';
    }

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    return `${start}-${end} of ${total}`;
  },
);

export const selectFavoriteBooks = createSelector(
  selectAllBooks,
  (books) => books.filter((book) => book.favorite),
);

export const selectSelectedBook = createSelector(
  selectBookEntities,
  selectSelectedBookId,
  (entities, selectedBookId) =>
    selectedBookId === null ? null : entities[selectedBookId] ?? null,
);

export const selectBooksSummary = createSelector(
  selectTotalBooks,
  selectFavoriteBooks,
  selectPageRange,
  (pageTotal, favorites, pageRange) =>
    `${pageRange} books, ${pageTotal} on this page, ${favorites.length} favorites here`,
);

export interface BooksViewModel {
  books: Book[];
  canGoNext: boolean;
  canGoPrevious: boolean;
  error: string | null;
  lastSavedAt: string | null;
  loading: boolean;
  page: number;
  saveError: string | null;
  saving: boolean;
  selectedBook: Book | null;
  summary: string;
  totalPages: number;
}

export const selectBooksViewModel = createSelector(
  selectAllBooks,
  selectError,
  selectLastSavedAt,
  selectLoading,
  selectPage,
  selectSaveError,
  selectSaving,
  selectSelectedBook,
  selectBooksSummary,
  selectTotalPages,
  (
    books,
    error,
    lastSavedAt,
    loading,
    page,
    saveError,
    saving,
    selectedBook,
    summary,
    totalPages,
  ): BooksViewModel => ({
    books,
    canGoNext: page < totalPages,
    canGoPrevious: page > 1,
    error,
    lastSavedAt,
    loading,
    page,
    saveError,
    saving,
    selectedBook,
    summary,
    totalPages,
  }),
);

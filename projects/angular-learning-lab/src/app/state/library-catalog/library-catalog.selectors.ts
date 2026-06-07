import { createSelector } from '@ngrx/store';

import { CatalogBookViewModel } from './library-catalog.models';
import {
  authorsAdapter,
  booksAdapter,
  libraryCatalogFeature,
} from './library-catalog.reducer';

const authorSelectors = authorsAdapter.getSelectors();
const bookSelectors = booksAdapter.getSelectors();

export const {
  selectLibraryCatalogState,
  selectSelectedAuthorId,
} = libraryCatalogFeature;

export const selectAuthorsState = createSelector(
  selectLibraryCatalogState,
  (state) => state.authors,
);

export const selectBooksState = createSelector(
  selectLibraryCatalogState,
  (state) => state.books,
);

export const selectAllCatalogAuthors = createSelector(
  selectAuthorsState,
  authorSelectors.selectAll,
);

export const selectAuthorEntities = createSelector(
  selectAuthorsState,
  authorSelectors.selectEntities,
);

export const selectAllCatalogBooks = createSelector(
  selectBooksState,
  bookSelectors.selectAll,
);

export const selectSelectedAuthor = createSelector(
  selectAuthorEntities,
  selectSelectedAuthorId,
  (authorEntities, selectedAuthorId) =>
    selectedAuthorId ? authorEntities[selectedAuthorId] ?? null : null,
);

export const selectCatalogBookViewModels = createSelector(
  selectAllCatalogBooks,
  selectAuthorEntities,
  selectSelectedAuthorId,
  (books, authorEntities, selectedAuthorId): CatalogBookViewModel[] =>
    books
      .filter((book) => !selectedAuthorId || book.authorId === selectedAuthorId)
      .map((book) => ({
        authorName: authorEntities[book.authorId]?.name ?? 'Unknown author',
        id: book.id,
        title: book.title,
        year: book.year,
      })),
);

export const selectCatalogSummary = createSelector(
  selectCatalogBookViewModels,
  selectSelectedAuthor,
  (books, selectedAuthor) =>
    selectedAuthor
      ? `${books.length} books by ${selectedAuthor.name}`
      : `${books.length} books across all authors`,
);


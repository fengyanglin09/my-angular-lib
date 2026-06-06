import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LibraryCatalogActions } from './library-catalog.actions';
import { CatalogAuthor, CatalogBook } from './library-catalog.models';

export interface LibraryCatalogState {
  authors: EntityState<CatalogAuthor>;
  books: EntityState<CatalogBook>;
  selectedAuthorId: number | null;
}

export const authorsAdapter = createEntityAdapter<CatalogAuthor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const booksAdapter = createEntityAdapter<CatalogBook>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialAuthors = authorsAdapter.addMany(
  [
    { id: 1, name: 'Maya Chen', specialty: 'Angular architecture' },
    { id: 2, name: 'Sam Rivera', specialty: 'Reactive systems' },
    { id: 3, name: 'Ari Patel', specialty: 'Frontend testing' },
  ],
  authorsAdapter.getInitialState(),
);

const initialBooks = booksAdapter.addMany(
  [
    { id: 101, authorId: 1, title: 'Standalone Angular Patterns', year: 2025 },
    { id: 102, authorId: 1, title: 'Signals In Practice', year: 2026 },
    { id: 201, authorId: 2, title: 'RxJS For Product Teams', year: 2024 },
    { id: 202, authorId: 2, title: 'Effect Concurrency Recipes', year: 2026 },
    { id: 301, authorId: 3, title: 'Testing Store-Driven UIs', year: 2025 },
  ],
  booksAdapter.getInitialState(),
);

export const initialLibraryCatalogState: LibraryCatalogState = {
  authors: initialAuthors,
  books: initialBooks,
  selectedAuthorId: null,
};

export const libraryCatalogFeature = createFeature({
  name: 'libraryCatalog',
  reducer: createReducer(
    initialLibraryCatalogState,
    on(LibraryCatalogActions.selectAuthor, (state, { authorId }) => ({
      ...state,
      selectedAuthorId: authorId,
    })),
  ),
});


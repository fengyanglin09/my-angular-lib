import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { BooksActions } from './books.actions';
import { Book } from './books.models';

export interface BooksState extends EntityState<Book> {
  error: string | null;
  lastSavedAt: string | null;
  loading: boolean;
  nextId: number;
  page: number;
  pageSize: number;
  saveError: string | null;
  saving: boolean;
  selectedBookId: number | null;
  total: number;
}

export const booksAdapter = createEntityAdapter<Book>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const starterBooks: Book[] = [
  {
    id: 1,
    title: 'Angular State Patterns',
    author: 'Ada Weaver',
    favorite: true,
  },
  {
    id: 2,
    title: 'RxJS In Practice',
    author: 'Ben Stream',
    favorite: false,
  },
  {
    id: 3,
    title: 'NgRx Field Guide',
    author: 'Casey Store',
    favorite: false,
  },
];

const remoteBooks: Book[] = Array.from({ length: 42 }, (_, index) => {
  const id = index + 1;
  const authors = ['Ada Weaver', 'Ben Stream', 'Casey Store', 'Dana Signal'];
  const topics = ['Angular', 'RxJS', 'NgRx', 'Signals', 'Testing', 'Routing'];

  return {
    id,
    title: `${topics[index % topics.length]} Patterns ${id}`,
    author: authors[index % authors.length],
    favorite: id % 7 === 0,
  };
});

export const initialBooksState: BooksState = booksAdapter.getInitialState({
  error: null,
  lastSavedAt: null,
  loading: false,
  nextId: 1,
  page: 1,
  pageSize: 5,
  saveError: null,
  saving: false,
  selectedBookId: null,
  total: 0,
});

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialBooksState,
    on(BooksActions.loadBooks, (state, { page, pageSize }) => ({
      ...state,
      error: null,
      loading: true,
      page,
      pageSize,
    })),
    on(BooksActions.loadBooksSuccess, (state, { books, page, pageSize, total }) => {
      const nextId = Math.max(state.nextId - 1, ...books.map((book) => book.id), total) + 1;
      const selectedBookId = books[0]?.id ?? null;

      return booksAdapter.setAll(books, {
        ...state,
        error: null,
        loading: false,
        nextId,
        page,
        pageSize,
        selectedBookId,
        total,
      });
    }),
    on(BooksActions.loadBooksFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(BooksActions.saveBooks, (state) => ({
      ...state,
      saveError: null,
      saving: true,
    })),
    on(BooksActions.saveBooksSuccess, (state, { savedAt }) => ({
      ...state,
      lastSavedAt: savedAt,
      saveError: null,
      saving: false,
    })),
    on(BooksActions.saveBooksFailure, (state, { error }) => ({
      ...state,
      saveError: error,
      saving: false,
    })),
    on(BooksActions.addBook, (state, { title, author }) =>
      booksAdapter.addOne(
        {
          id: state.nextId,
          title,
          author,
          favorite: false,
        },
        {
          ...state,
          nextId: state.nextId + 1,
          selectedBookId: state.nextId,
        },
      ),
    ),
    on(BooksActions.selectBook, (state, { id }) => ({
      ...state,
      selectedBookId: id,
    })),
    on(BooksActions.toggleFavorite, (state, { id }) => {
      const book = state.entities[id];

      if (!book) {
        return state;
      }

      return booksAdapter.updateOne(
        {
          id,
          changes: {
            favorite: !book.favorite,
          },
        },
        state,
      );
    }),
    on(BooksActions.removeBook, (state, { id }) =>
      booksAdapter.removeOne(id, {
        ...state,
        selectedBookId: state.selectedBookId === id ? null : state.selectedBookId,
      }),
    ),
  ),
});

export { remoteBooks, starterBooks };

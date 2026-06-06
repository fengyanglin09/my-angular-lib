import { createActionGroup, props } from '@ngrx/store';

import { Book } from './books.models';

export const BooksActions = createActionGroup({
  source: 'Books Lesson',
  events: {
    'Load Books': props<{ page: number; pageSize: number; shouldFail: boolean }>(),
    'Load Books Success': props<{ books: Book[]; page: number; pageSize: number; total: number }>(),
    'Load Books Failure': props<{ error: string }>(),
    'Save Books': props<{ shouldFail: boolean }>(),
    'Save Books Success': props<{ savedAt: string }>(),
    'Save Books Failure': props<{ error: string }>(),
    'Add Book': props<{ title: string; author: string }>(),
    'Select Book': props<{ id: number }>(),
    'Toggle Favorite': props<{ id: number }>(),
    'Remove Book': props<{ id: number }>(),
  },
});

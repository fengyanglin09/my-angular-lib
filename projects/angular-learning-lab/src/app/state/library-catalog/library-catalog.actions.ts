import { createActionGroup, props } from '@ngrx/store';

export const LibraryCatalogActions = createActionGroup({
  source: 'Library Catalog',
  events: {
    'Select Author': props<{ authorId: number | null }>(),
  },
});


import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TodosActions = createActionGroup({
  source: 'Todos Lesson',
  events: {
    'Add Todo': props<{ title: string }>(),
    'Toggle Todo': props<{ id: number }>(),
    'Delete Todo': props<{ id: number }>(),
    'Clear Completed': emptyProps(),
  },
});

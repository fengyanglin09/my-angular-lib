import { createSelector } from '@ngrx/store';

import { todosFeature } from './todos.reducer';

export const { selectTodosState, selectTodos } = todosFeature;

export const selectTotalTodos = createSelector(
  selectTodos,
  (todos) => todos.length,
);

export const selectCompletedTodos = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => todo.completed).length,
);

export const selectOpenTodos = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => !todo.completed).length,
);

export const selectTodosSummary = createSelector(
  selectTotalTodos,
  selectOpenTodos,
  selectCompletedTodos,
  (total, open, completed) => `${open} open, ${completed} completed, ${total} total`,
);

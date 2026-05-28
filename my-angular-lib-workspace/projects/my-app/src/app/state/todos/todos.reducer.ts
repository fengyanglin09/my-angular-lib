import { createFeature, createReducer, on } from '@ngrx/store';

import { TodosActions } from './todos.actions';
import { Todo } from './todos.models';

export interface TodosState {
  todos: Todo[];
  nextId: number;
}

export const initialTodosState: TodosState = {
  todos: [
    {
      id: 1,
      title: 'Read the action payload',
      completed: false,
    },
    {
      id: 2,
      title: 'Notice the reducer returns new arrays',
      completed: false,
    },
  ],
  nextId: 3,
};

export const todosFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialTodosState,
    on(TodosActions.addTodo, (state, { title }) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: state.nextId,
          title,
          completed: false,
        },
      ],
      nextId: state.nextId + 1,
    })),
    on(TodosActions.toggleTodo, (state, { id }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    })),
    on(TodosActions.deleteTodo, (state, { id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
    on(TodosActions.clearCompleted, (state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  ),
});

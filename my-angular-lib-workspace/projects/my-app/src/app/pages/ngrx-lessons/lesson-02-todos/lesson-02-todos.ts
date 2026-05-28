import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { TodosActions } from '../../../state/todos/todos.actions';
import { selectTodos, selectTodosSummary } from '../../../state/todos/todos.selectors';

@Component({
  selector: 'app-lesson-02-todos',
  imports: [FormsModule, RouterLink],
  templateUrl: './lesson-02-todos.html',
  styleUrl: './lesson-02-todos.css',
})
export class Lesson02Todos {
  private readonly store = inject(Store);

  protected readonly todos = this.store.selectSignal(selectTodos);
  protected readonly summary = this.store.selectSignal(selectTodosSummary);
  protected newTodoTitle = '';

  protected addTodo(): void {
    const title = this.newTodoTitle.trim();

    if (!title) {
      return;
    }

    this.store.dispatch(TodosActions.addTodo({ title }));
    this.newTodoTitle = '';
  }

  protected toggleTodo(id: number): void {
    this.store.dispatch(TodosActions.toggleTodo({ id }));
  }

  protected deleteTodo(id: number): void {
    this.store.dispatch(TodosActions.deleteTodo({ id }));
  }

  protected clearCompleted(): void {
    this.store.dispatch(TodosActions.clearCompleted());
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import AppConstants from '../app/app.constants';
import TodoItem from '../model/TodoItem';

const initialTodoItems = [
  new TodoItem(1, 'Remind before random topic for 7 days', 1, true, true),
  new TodoItem(
    2,
    'Remind before dictionary practice for 7 days',
    1,
    true,
    true
  ),
  new TodoItem(3, 'Remind before FS set for 7 days', 1, true, true, 2),
  new TodoItem(
    4,
    'Aware for real life conversation without reminder for 7 days',
    1,
    false,
    false,
    2
  ),
];

@Injectable({ providedIn: 'root' })
export class TodoService {
  private httpClient = inject(HttpClient);

  private _todoItems = signal(initialTodoItems);

  todoItems = this._todoItems.asReadonly();

  getTodoItems(taskId: number) {
    return this.httpClient.get<{ todoItems: TodoItem[] }>(
      `${AppConstants.baseAddress}/todo-service/todoitems/${taskId}`
    );
  }

  getSprintTodoItems(sprintId: number) {
    return this.httpClient.get<{ todoItems: TodoItem[] }>(
      `${AppConstants.baseAddress}/todo-service/todoitems/sprint/${sprintId}`
    );
  }

  toggleCompleted(todoItem: TodoItem) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/complete/${todoItem.id}`,
      {
        completed: !todoItem.completed,
      }
    );
  }

  markAsTwentyPercent(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/twentypercent/${id}`,
      {
        twentypercent: true,
      }
    );
  }

  markAsNormal(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/twentypercent/${id}`,
      {
        twentypercent: false,
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/todo-service/todoitems/${id}`
    );
  }

  addTodoItem(title: string, taskId: number) {
    return this.httpClient.post(
      `${AppConstants.baseAddress}/todo-service/todoitems`,
      {
        TodoItem: {
          text: title,
          taskId,
        },
      }
    );
  }

  updateTodoItem(id: number, title: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/text/${id}`,
      {
        text: title,
      }
    );
  }

  moveTodoItem(id: number, taskId: number, index: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/move/${id}`,
      {
        taskId,
        index,
      }
    );
  }

  getById(id: number) {
    return this._todoItems().find((item) => item.id === id);
  }

  assignSprint(id: number, sprintId: number | undefined) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/sprint/${id}`,
      {
        sprintId,
      }
    );
  }

  assignDate(id: number, dateString: string | undefined) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/todoitems/date/${id}`,
      {
        date: dateString,
      }
    );
  }
}

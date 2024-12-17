import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import AppConstants from '../app/app.constants';
import Task from '../model/Task';

const initialTasks = [
  new Task(
    1,
    'Remind yourself to think as real life conversation before start video',
    1,
    true,
    true
  ),
  new Task(2, 'Look at bar above mobile screen', 1, true, true),
  new Task(
    3,
    'Make runtime content, just keep the content clarity points',
    1,
    true,
    true
  ),
  new Task(4, 'Normal face expression', 1),
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  private httpClient = inject(HttpClient);
  private _tasks = signal(initialTasks);

  tasks = this._tasks.asReadonly();

  getTasks(objectiveId: number) {
    return this.httpClient.get<{ tasks: Task[] }>(
      `${AppConstants.baseAddress}/todo-service/tasks/${objectiveId}`
    );
  }

  toggleCompleted(task: Task) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/tasks/complete/${task.id}`,
      {
        completed: !task.completed,
      }
    );
  }

  markAsTwentyPercent(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/tasks/twentypercent/${id}`,
      {
        twentypercent: true,
      }
    );
  }

  markAsNormal(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/tasks/twentypercent/${id}`,
      {
        twentypercent: false,
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/todo-service/tasks/${id}`
    );
  }

  addTask(title: string, objectiveId: number) {
    return this.httpClient.post(
      `${AppConstants.baseAddress}/todo-service/tasks`,
      {
        task: {
          text: title,
          objectiveId,
        },
      }
    );
  }

  updateTask(id: number, title: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/tasks/text/${id}`,
      {
        text: title,
      }
    );
  }

  moveTask(id: number, objectiveId: number, index: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/todo-service/tasks/move/${id}`,
      {
        objectiveId,
        index,
      }
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ task: Task }>(
      `${AppConstants.baseAddress}/todo-service/tasks/detail/${id}`
    );
  }
}

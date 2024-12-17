import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import AppConstants from '../app/app.constants';
import Sprint from '../model/Sprint';

const initialSprints = [
  new Sprint(1, 'Sprint 101', new Date(2024, 8, 30), new Date(2024, 9, 4)),
  new Sprint(
    2,
    'Sprint 102',
    new Date(2024, 9, 7),
    new Date(2024, 9, 11),
    false
  ),
  new Sprint(3, 'Sprint 103', new Date(2024, 9, 14), new Date(2024, 9, 18)),
];

@Injectable({ providedIn: 'root' })
export class SprintService {
  private httpClient = inject(HttpClient);

  private _sprints = signal(initialSprints);

  sprints = this._sprints.asReadonly();

  getSprints() {
    return this.httpClient.get<{ sprints: Sprint[] }>(
      `${AppConstants.baseAddress}/sprint-service/sprints`
    );
  }

  addSprint(title: string, startDate: Date, endDate: Date) {
    return this.httpClient.post(
      `${AppConstants.baseAddress}/sprint-service/sprints`,
      {
        sprint: {
          text: title,
          startDate,
          endDate,
        },
      }
    );
  }

  updateSprint(id: number, title: string, startDate: Date, endDate: Date) {
    return this.httpClient.put(
      `${AppConstants.baseAddress}/sprint-service/sprints`,
      {
        sprint: {
          id,
          text: title,
          startDate,
          endDate,
        },
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/sprint-service/sprints/${id}`
    );
  }

  toggleCompleted(sprint: Sprint) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/sprint-service/sprints/complete/${sprint.id}`,
      {
        completed: !sprint.completed,
      }
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ sprint: Sprint }>(
      `${AppConstants.baseAddress}/sprint-service/sprints/detail/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import AppConstants from '../app/app.constants';
import Objective from '../model/Objective';

const initialObjectives = [
  new Objective(1, 'Feeling as real time conversation', 1, true, true),
  new Objective(2, 'Think in english', 1, true, true),
  new Objective(3, 'Run time topic', 1, true, true),
  new Objective(4, 'English Movies', 1),
];

@Injectable({ providedIn: 'root' })
export class ObjectiveService {
  // private _objectives = signal(initialObjectives);
  private httpClient = inject(HttpClient);
  private _objectives = signal(initialObjectives);

  // objectives = this._objectives.asReadonly();

  getObjectives(goalId: number) {
    return this.httpClient.get<{ objectives: Objective[] }>(
      `${AppConstants.baseAddress}/objective-service/objectives/${goalId}`
    );
  }

  updatePlan(id: number, plan: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/plan/${id}`,
      {
        plan,
      }
    );
  }

  toggleCompleted(objective: Objective) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/complete/${objective.id}`,
      {
        completed: !objective.completed,
      }
    );
  }

  markAsTwentyPercent(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/twentypercent/${id}`,
      {
        twentypercent: true,
      }
    );
  }

  markAsNormal(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/twentypercent/${id}`,
      {
        twentypercent: false,
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/objective-service/objectives/${id}`
    );
  }

  addObjective(title: string, goalId: number) {
    return this.httpClient.post(
      `${AppConstants.baseAddress}/objective-service/objectives`,
      {
        objective: {
          text: title,
          goalId,
        },
      }
    );
  }

  updateObjective(id: number, title: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/text/${id}`,
      {
        text: title,
      }
    );
  }

  moveObjective(id: number, goalId: number, index: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/objective-service/objectives/move/${id}`,
      {
        goalId,
        index,
      }
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ objective: Objective }>(
      `${AppConstants.baseAddress}/objective-service/objectives/detail/${id}`
    );
  }
}

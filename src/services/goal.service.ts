import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import AppConstants from '../app/app.constants';
import Goal from '../model/Goal';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private httpClient = inject(HttpClient);

  getGoals(problemId: number) {
    return this.httpClient.get<{ goals: Goal[] }>(
      `${AppConstants.baseAddress}/goal-service/goals/${problemId}`
    );
  }

  updatePlan(id: number, plan: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/plan/${id}`,
      {
        plan,
      }
    );
  }

  toggleCompleted(goal: Goal) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/complete/${goal.id}`,
      {
        completed: !goal.completed,
      }
    );
  }

  markAsTwentyPercent(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/twentypercent/${id}`,
      {
        twentypercent: true,
      }
    );
  }

  markAsNormal(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/twentypercent/${id}`,
      {
        twentypercent: false,
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/goal-service/goals/${id}`
    );
  }

  addGoal(title: string, problemId: number) {
    return this.httpClient.post(
      `${AppConstants.baseAddress}/goal-service/goals`,
      {
        goal: {
          text: title,
          problemId: problemId,
        },
      }
    );
  }

  updateGoal(id: number, title: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/text/${id}`,
      {
        text: title,
      }
    );
  }

  moveGoal(id: number, problemId: number, index: number) {
    let newIndex = index + 1;
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/goal-service/goals/move/${id}`,
      {
        problemId,
        index: newIndex,
      }
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ goal: Goal }>(
      `${AppConstants.baseAddress}/goal-service/goals/detail/${id}`
    );
  }
}

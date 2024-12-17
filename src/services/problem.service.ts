import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import AppConstants from '../app/app.constants';
import Problem from '../model/Problem';

const initialProblems = [
  new Problem(1, 'Not able to speak in english', 1, true, true),
  new Problem(2, 'Lack of sales man skill', 1, true, true),
  new Problem(3, 'Build product from scratch', 1, true, true),
  new Problem(4, 'Business mindset', 1),
];

@Injectable({ providedIn: 'root' })
export class ProblemService {
  private httpClient = inject(HttpClient);

  private _problems = signal(initialProblems);

  problems = this._problems.asReadonly();

  getProblems(lifeAreaId: number) {
    return this.httpClient.get<{ problems: Problem[] }>(
      `${AppConstants.baseAddress}/problem-service/problems/${lifeAreaId}`
    );
  }

  updatePlan(id: number, plan: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/plan/${id}`,
      {
        plan,
      }
    );
  }

  toggleCompleted(id: number, completed: boolean) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/complete/${id}`,
      {
        completed: completed,
      }
    );
  }

  markAsTwentyPercent(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/twentypercent/${id}`,
      {
        twentypercent: true,
      }
    );
  }

  markAsNormal(id: number) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/twentypercent/${id}`,
      {
        twentypercent: false,
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      `${AppConstants.baseAddress}/problem-service/problems/${id}`
    );
  }

  addProblem(title: string, lifeAreaId: number) {
    // const problemIds = this._problems().map((problem) => problem.id);
    // const id = problemIds.length === 0 ? 1 : Math.max(...problemIds) + 1;
    // this._problems.update((prevProblems) => [
    //   ...prevProblems,
    //   new Problem(id, title, lifeAreaId),
    // ]);

    return this.httpClient.post(
      `${AppConstants.baseAddress}/problem-service/problems`,
      {
        Problem: {
          text: title,
          lifeAreaId: lifeAreaId,
        },
      }
    );
  }

  updateProblem(id: number, title: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/text/${id}`,
      {
        text: title,
      }
    );
  }

  moveProblem(id: number, lifeAreaId: number, index: number) {
    const newIndex = index + 1;

    return this.httpClient.patch(
      `${AppConstants.baseAddress}/problem-service/problems/move/${id}`,
      {
        lifeAreaId: lifeAreaId,
        index: newIndex,
      }
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ problem: Problem }>(
      `${AppConstants.baseAddress}/problem-service/problems/detail/${id}`
    );
  }
}

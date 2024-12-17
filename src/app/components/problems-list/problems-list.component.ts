import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Problem from '../../../model/Problem';
import { ProblemService } from '../../../services/problem.service';

@Component({
  selector: 'app-problems-list',
  standalone: true,
  imports: [CdkDrag, CdkDropList, RouterLink],
  templateUrl: './problems-list.component.html',
  styleUrl: './problems-list.component.scss',
})
export class ProblemsTabComponent {
  problemService = inject(ProblemService);
  lifeAreaId = input.required<number>();
  problems = input.required<Problem[]>();

  onedit = output<Problem>();
  ondelete = output<number>();
  ontogglecompleted = output<Problem>();
  onmarkastwentypercent = output<number>();
  onmarkasnormal = output<number>();
  onloadproblems = output();

  markAsNormal(id: number) {
    this.onmarkasnormal.emit(id);
  }

  markAsTwentyPercent(id: number) {
    this.onmarkastwentypercent.emit(id);
  }

  handleEdit(problem: Problem) {
    this.onedit.emit(problem);
  }

  toggleCompleted(problem: Problem) {
    this.ontogglecompleted.emit(problem);
  }

  dropProblem(event: CdkDragDrop<Problem[]>) {
    const id = this.problems()[event.previousIndex].id;
    const lifeAreadId = +this.lifeAreaId();

    this.problemService
      .moveProblem(id, lifeAreadId, event.currentIndex)
      .subscribe({
        next: () => this.onloadproblems.emit(),
      });
  }

  handleDelete(id: number) {
    this.ondelete.emit(id);
  }
}

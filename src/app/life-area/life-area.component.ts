import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import LifeArea from '../../model/LifeArea';
import { PathItem } from '../../model/PathItem';
import Problem from '../../model/Problem';
import { LifeAreaService } from '../../services/life-area.service';
import { ProblemService } from '../../services/problem.service';
import { AddEditModalComponent } from '../components/add-edit-modal/add-edit-modal.component';
import { BreadcrumComponent } from '../components/breadcrum/breadcrum.component';
import { PageHederComponent } from '../components/page-heder/page-heder.component';
import { ProblemsTabComponent } from '../components/problems-list/problems-list.component';
import { TopItemsComponent } from '../components/top-items/top-items.component';

@Component({
  selector: 'app-life-area',
  standalone: true,
  imports: [
    BreadcrumComponent,
    PageHederComponent,
    TopItemsComponent,
    FormsModule,

    AddEditModalComponent,
    ProblemsTabComponent,
  ],
  templateUrl: './life-area.component.html',
  styleUrl: './life-area.component.scss',
})
export class LifeAreaComponent implements OnInit {
  id = input.required<number>();
  vision: string = '';
  plan: string = '';

  showProblemModal = false;
  selectedProblemId: number | undefined;
  enteredTitle: string = '';

  private lifeAreaService = inject(LifeAreaService);
  private problemService = inject(ProblemService);

  lifeArea = signal<LifeArea | undefined>(undefined);
  problems = signal<Problem[]>([]);

  get paths() {
    return [new PathItem('Life Areas', '/'), new PathItem('Detail', '')];
  }

  get top20PercentProblems() {
    return this.problems()
      .filter((prob) => prob.twentyPercent)
      .map((problem) => new PathItem(problem.text, '/problem/' + problem.id));
  }

  ngOnInit() {
    this.lifeAreaService.getById(+this.id()).subscribe({
      next: (res) => {
        this.lifeArea.set(res.lifeArea);
        this.vision = res.lifeArea?.vision ?? '';
        this.plan = res.lifeArea?.plan ?? '';
      },
    });

    this.loadProblems();
  }

  loadProblems() {
    this.problemService.getProblems(+this.id()).subscribe({
      next: (res) => {
        console.log(res);
        this.problems.set(
          res.problems.sort((a, b) => (a.index < b.index ? -1 : 1))
        );
      },
    });
  }

  updateVision() {
    this.lifeAreaService.updateVision(+this.id(), this.vision).subscribe({
      error: (error) => console.log(error),
    });
  }

  updatePlan() {
    this.lifeAreaService.updatePlan(+this.id(), this.plan).subscribe({
      error: (error) => console.log(error),
    });
  }

  startAddingProblem() {
    this.showProblemModal = true;
  }

  hideModal() {
    this.showProblemModal = false;
    this.selectedProblemId = undefined;
    this.enteredTitle = '';
  }

  handleEdit(problem: Problem) {
    this.showProblemModal = true;
    this.selectedProblemId = problem.id;
    this.enteredTitle = problem.text;
  }

  handleSubmitForm(title: string) {
    if (this.selectedProblemId) {
      this.problemService
        .updateProblem(this.selectedProblemId, title)
        .subscribe({
          next: () => this.loadProblems(),
        });
    } else {
      // this.problemService.addProblem(title, this.id());
      this.problemService.addProblem(title, this.id()).subscribe({
        next: () => {
          this.loadProblems();
        },
      });
    }
  }

  handleDelete(id: number) {
    const confirmed = window.confirm('Do you really want to delete?');
    if (confirmed) {
      this.problemService.delete(id).subscribe({
        next: () => {
          this.loadProblems();
        },
      });
    }
  }

  toggleProblemCompleted(problem: Problem) {
    this.problemService
      .toggleCompleted(problem.id, !problem.completed)
      .subscribe({
        error: () => {
          this.loadProblems();
        },
      });
  }

  markAsTwentyPercent(id: number) {
    this.problemService.markAsTwentyPercent(id).subscribe({
      complete: () => {
        this.loadProblems();
      },
    });
  }

  markAsNormal(id: number) {
    this.problemService.markAsNormal(id).subscribe({
      complete: () => {
        this.loadProblems();
      },
    });
  }
}

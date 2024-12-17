import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Goal from '../../model/Goal';
import Objective from '../../model/Objective';
import { PathItem } from '../../model/PathItem';
import Problem from '../../model/Problem';
import { GoalService } from '../../services/goal.service';
import { ObjectiveService } from '../../services/objective.service';
import { ProblemService } from '../../services/problem.service';
import { AddEditModalComponent } from '../components/add-edit-modal/add-edit-modal.component';
import { BreadcrumComponent } from '../components/breadcrum/breadcrum.component';
import { GoalsListComponent } from '../components/goals-list/goals-list.component';
import { ObjectivesListComponent } from '../components/objectives-list/objectives-list.component';
import { PageHederComponent } from '../components/page-heder/page-heder.component';
import { TopItemsComponent } from '../components/top-items/top-items.component';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [
    BreadcrumComponent,
    PageHederComponent,
    FormsModule,
    GoalsListComponent,
    AddEditModalComponent,
    TopItemsComponent,
    ObjectivesListComponent,
  ],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss',
})
export class GoalComponent {
  id = input.required<number>();
  plan: string = '';

  showObjectiveModal = false;
  selectedObjectiveId: number | undefined;
  enteredTitle: string = '';

  private objectiveService = inject(ObjectiveService);
  private goalService = inject(GoalService);
  private problemService = inject(ProblemService);

  problem = signal<Problem | undefined>(undefined);
  goal = signal<Goal | undefined>(undefined);
  objectives = signal<Objective[]>([]);

  get paths() {
    return [
      new PathItem('Life Areas', '/'),
      new PathItem('Problems', '/lifearea/' + this.problem()?.lifeAreaId),
      new PathItem('Goals', '/problem/' + this.goal()?.problemId),
      new PathItem('Detail', ''),
    ];
  }

  // objectives = computed(() =>
  //   this.objectiveService
  //     .objectives()
  //     .sort((a, b) => (a.index < b.index ? -1 : 1))
  // );

  get top20PercentGoals() {
    return this.objectives()
      .filter((objective) => objective.twentyPercent)
      .map(
        (objective) =>
          new PathItem(objective.text, '/objective/' + objective.id)
      );
  }

  ngOnInit() {
    this.goalService.getById(+this.id()).subscribe({
      next: (res) => {
        this.goal.set(res.goal);
        this.plan = res.goal?.plan ?? '';
        this.loadProblem(res.goal?.problemId ?? 0);
      },
    });

    this.loadObjectives();
  }

  loadProblem(problemId: number) {
    const problem = this.problemService.getById(problemId ?? 0).subscribe({
      next: (res) => {
        this.problem.set(res.problem);
      },
    });
  }

  loadObjectives() {
    this.objectiveService.getObjectives(+this.id()).subscribe({
      next: (res) => {
        this.objectives.set(
          res.objectives.sort((a, b) => (a.index < b.index ? -1 : 1))
        );
      },
    });
  }

  updatePlan() {
    this.goalService.updatePlan(+this.id(), this.plan).subscribe({});
  }

  startAddingObjective() {
    this.showObjectiveModal = true;
  }

  hideModal() {
    this.showObjectiveModal = false;
    this.selectedObjectiveId = undefined;
    this.enteredTitle = '';
  }

  handleEdit(objective: Objective) {
    this.showObjectiveModal = true;
    this.selectedObjectiveId = objective.id;
    this.enteredTitle = objective.text;
  }

  handleSubmitForm(title: string) {
    if (this.selectedObjectiveId) {
      this.objectiveService
        .updateObjective(this.selectedObjectiveId, title)
        .subscribe({
          next: () => this.loadObjectives(),
        });
    } else {
      this.objectiveService.addObjective(title, +this.id()).subscribe({
        next: () => this.loadObjectives(),
      });
    }
  }
}

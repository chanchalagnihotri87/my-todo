import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Goal from '../../model/Goal';
import Objective from '../../model/Objective';
import { PathItem } from '../../model/PathItem';
import Problem from '../../model/Problem';
import Task from '../../model/Task';
import TodoItem from '../../model/TodoItem';
import { GoalService } from '../../services/goal.service';
import { ObjectiveService } from '../../services/objective.service';
import { ProblemService } from '../../services/problem.service';
import { SprintService } from '../../services/sprint.service';
import { TaskService } from '../../services/task.service';
import { TodoService } from '../../services/todo.service';
import { AddEditModalComponent } from '../components/add-edit-modal/add-edit-modal.component';
import { BreadcrumComponent } from '../components/breadcrum/breadcrum.component';
import { GoalsListComponent } from '../components/goals-list/goals-list.component';
import { PageHederComponent } from '../components/page-heder/page-heder.component';
import { TodoItemsListComponent } from '../components/todo-items-list/todo-items-list.component';
import { TopItemsComponent } from '../components/top-items/top-items.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    BreadcrumComponent,
    PageHederComponent,
    FormsModule,
    GoalsListComponent,
    AddEditModalComponent,
    TopItemsComponent,
    TodoItemsListComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  id = input.required<number>();

  showTodoModal = false;
  selectedTodoItemId: number | undefined;
  enteredTitle: string = '';

  private todoService = inject(TodoService);
  private taskService = inject(TaskService);
  private objectiveService = inject(ObjectiveService);
  private goalService = inject(GoalService);
  private problemService = inject(ProblemService);
  private sprintService = inject(SprintService);

  task = signal<Task | undefined>(undefined);

  objective = signal<Objective | undefined>(undefined);

  goal = signal<Goal | undefined>(undefined);

  problem = signal<Problem | undefined>(undefined);

  todoItems = signal<TodoItem[]>([]);

  get paths() {
    return [
      new PathItem('Life Areas', '/'),
      new PathItem('Problems', '/lifearea/' + this.problem()?.lifeAreaId),
      new PathItem('Goals', '/problem/' + this.goal()?.problemId),
      new PathItem('Objectives', '/goal/' + this.objective()?.goalId),
      new PathItem('Tasks', '/objective/' + this.task()?.objectiveId),
      new PathItem('Detail', ''),
    ];
  }

  get top20PercentTasks() {
    return this.todoItems()
      .filter((task) => task.twentyPercent)
      .map((task) => new PathItem(task.text, '/task/' + task.id));
  }

  ngOnInit() {
    this.taskService.getById(+this.id()).subscribe({
      next: (res) => {
        this.task.set(res.task);
        this.loadObjective(res.task.objectiveId);
      },
    });

    this.loadTodoItems();
  }

  loadGoal(goalId: number) {
    this.goalService.getById(goalId).subscribe({
      next: (res) => {
        this.goal.set(res.goal);
        this.loadProblem(res.goal.problemId);
      },
    });
  }

  loadObjective(objectiveId: number) {
    this.objectiveService.getById(objectiveId).subscribe({
      next: (res) => {
        this.objective.set(res.objective);

        this.loadGoal(res.objective?.goalId ?? 0);
      },
    });
  }

  loadProblem(problemId: number) {
    const problem = this.problemService.getById(problemId ?? 0).subscribe({
      next: (res) => {
        this.problem.set(res.problem);
      },
    });
  }

  loadTodoItems() {
    this.todoService.getTodoItems(+this.id()).subscribe({
      next: (res) =>
        this.todoItems.set(
          res.todoItems.sort((a, b) => (a.index < b.index ? -1 : 1))
        ),
    });
  }

  startAddingTodoItem() {
    this.showTodoModal = true;
  }

  hideModal() {
    this.showTodoModal = false;
    this.selectedTodoItemId = undefined;
    this.enteredTitle = '';
  }

  handleEdit(todoItem: TodoItem) {
    this.showTodoModal = true;
    this.selectedTodoItemId = todoItem.id;
    this.enteredTitle = todoItem.text;
  }

  handleSubmitForm(title: string) {
    if (this.selectedTodoItemId) {
      this.todoService
        .updateTodoItem(this.selectedTodoItemId, title)
        .subscribe({
          next: () => this.loadTodoItems(),
        });
    } else {
      this.todoService.addTodoItem(title, +this.id()).subscribe({
        next: () => this.loadTodoItems(),
      });
    }
  }
}

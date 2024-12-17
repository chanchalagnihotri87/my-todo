import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Sprint from '../../../model/Sprint';
import TodoItem from '../../../model/TodoItem';
import { SprintService } from '../../../services/sprint.service';
import { TodoService } from '../../../services/todo.service';
import AppHelper from '../../app.helper';

@Component({
  selector: 'app-todo-items-list',
  standalone: true,
  imports: [CdkDrag, CdkDropList, RouterLink],
  templateUrl: './todo-items-list.component.html',
  styleUrl: './todo-items-list.component.scss',
})
export class TodoItemsListComponent {
  todoService = inject(TodoService);
  sprintService = inject(SprintService);
  taskId = input.required<number>();
  todoItems = input.required<TodoItem[]>();
  sprints = signal<Sprint[]>([]);

  onEdit = output<TodoItem>();
  onReloadItems = output();

  ngOnInit() {
    this.loadSprints();
  }

  loadSprints() {
    let today = new Date();

    this.sprintService.getSprints().subscribe({
      next: (res) => {
        console.log(res);
        this.sprints.set(
          res.sprints.filter(
            (sprint) => AppHelper.convertToDate(sprint.endDate) > today
          )
        );
      },
    });
  }

  markAsNormal(id: number) {
    this.todoService.markAsNormal(id).subscribe({
      next: () => {
        this.onReloadItems.emit();
      },
    });
  }

  markAsTwentyPercent(id: number) {
    this.todoService.markAsTwentyPercent(id).subscribe({
      next: () => {
        this.onReloadItems.emit();
      },
    });
  }

  handleEdit(todoItem: TodoItem) {
    this.onEdit.emit(todoItem);
  }
  handleDelete(id: number) {
    const confirmed = window.confirm('Do you really want to delete?');
    if (confirmed) {
      this.todoService.delete(id).subscribe({
        next: () => this.onReloadItems.emit(),
      });
    }
  }

  toggleCompleted(todoItem: TodoItem) {
    this.todoService.toggleCompleted(todoItem).subscribe({
      error: () => {
        this.onReloadItems.emit();
      },
    });
  }

  dropProblem(event: CdkDragDrop<TodoItem[]>) {
    const id = this.todoItems()[event.previousIndex].id;
    const objectiveId = +this.taskId();

    this.todoService
      .moveTodoItem(id, objectiveId, event.currentIndex)
      .subscribe({
        next: () => {
          this.onReloadItems.emit();
        },
      });
  }

  updateSprint(id: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.todoService.assignSprint(id, value ? +value : undefined).subscribe({
      error: () => this.onReloadItems.emit(),
    });
  }
}

import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Task from '../../../model/Task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CdkDrag, CdkDropList, RouterLink],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  taskService = inject(TaskService);
  objectiveId = input.required<number>();
  tasks = input.required<Task[]>();

  onEdit = output<Task>();
  onReloadTasks = output();

  markAsNormal(id: number) {
    this.taskService.markAsNormal(id).subscribe({
      next: () => this.onReloadTasks.emit(),
    });
  }

  markAsTwentyPercent(id: number) {
    this.taskService.markAsTwentyPercent(id).subscribe({
      next: () => this.onReloadTasks.emit(),
    });
  }

  handleEdit(task: Task) {
    this.onEdit.emit(task);
  }
  handleDelete(id: number) {
    const confirmed = window.confirm('Do you really want to delete?');
    if (confirmed) {
      this.taskService.delete(id).subscribe({
        next: () => this.onReloadTasks.emit(),
      });
    }
  }

  toggleCompleted(task: Task) {
    this.taskService.toggleCompleted(task).subscribe({
      error: () => this.onReloadTasks.emit(),
    });
  }

  dropProblem(event: CdkDragDrop<Task[]>) {
    const id = this.tasks()[event.previousIndex].id;
    const objectiveId = +this.objectiveId();

    this.taskService.moveTask(id, objectiveId, event.currentIndex).subscribe({
      next: () => this.onReloadTasks.emit(),
    });
  }
}

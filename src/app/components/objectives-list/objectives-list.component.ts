import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Objective from '../../../model/Objective';
import { ObjectiveService } from '../../../services/objective.service';

@Component({
  selector: 'app-objectives-list',
  standalone: true,
  imports: [CdkDrag, CdkDropList, RouterLink],
  templateUrl: './objectives-list.component.html',
  styleUrl: './objectives-list.component.scss',
})
export class ObjectivesListComponent {
  objectiveService = inject(ObjectiveService);
  goalId = input.required<number>();
  objectives = input.required<Objective[]>();

  onEdit = output<Objective>();
  onReloadObjectives = output();

  markAsNormal(id: number) {
    this.objectiveService.markAsNormal(id).subscribe({
      next: () => this.onReloadObjectives.emit(),
    });
  }

  markAsTwentyPercent(id: number) {
    this.objectiveService.markAsTwentyPercent(id).subscribe({
      next: () => this.onReloadObjectives.emit(),
    });
  }

  handleEdit(objective: Objective) {
    this.onEdit.emit(objective);
  }
  handleDelete(id: number) {
    const confirmed = window.confirm('Do you really want to delete?');
    if (confirmed) {
      this.objectiveService.delete(id).subscribe({
        next: () => this.onReloadObjectives.emit(),
      });
    }
  }

  toggleCompleted(objective: Objective) {
    this.objectiveService.toggleCompleted(objective).subscribe({
      next: () => this.onReloadObjectives.emit(),
    });
  }

  dropProblem(event: CdkDragDrop<Objective[]>) {
    const id = this.objectives()[event.previousIndex].id;
    const goalId = +this.goalId();
    const newIndex = event.currentIndex + 1;

    this.objectiveService.moveObjective(id, goalId, newIndex).subscribe({
      next: () => this.onReloadObjectives.emit(),
    });
  }
}

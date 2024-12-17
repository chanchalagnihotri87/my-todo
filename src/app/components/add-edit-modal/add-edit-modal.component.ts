import { Component, Input, input, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss',
})
export class AddEditModalComponent {
  showProblemModal = false;
  @Input() enteredTitle: string = '';
  // selectedProblemId: number | undefined;

  modalTitle = input.required<string>();
  onSubmit = output<string>();
  onClose = output();

  hideModal() {
    this.enteredTitle = '';
    this.onClose.emit();
  }

  onsubmitProblemForm(problemForm: NgForm) {
    if (problemForm.invalid) {
      return;
    }

    const enteredTitle = problemForm.form.value.title;

    // if (this.selectedProblemId) {
    //   this.problemService.updateProblem(this.selectedProblemId, enteredTitle);
    // } else {
    //   this.problemService.addProblem(enteredTitle, this.id());
    // }

    this.onSubmit.emit(enteredTitle);

    this.hideModal();
  }
}

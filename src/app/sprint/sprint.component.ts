import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PathItem } from '../../model/PathItem';
import Sprint from '../../model/Sprint';
import TodoItem from '../../model/TodoItem';
import { SprintService } from '../../services/sprint.service';
import { TodoService } from '../../services/todo.service';
import AppHelper from '../app.helper';
import { BreadcrumComponent } from '../components/breadcrum/breadcrum.component';
import { TopItemsComponent } from '../components/top-items/top-items.component';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [BreadcrumComponent, DatePipe, TopItemsComponent],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss',
})
export class SprintComponent implements OnInit {
  id = input.required<number>();
  sprint = signal<Sprint | undefined>(undefined);
  dateRange = signal<Date[]>([]);
  todoItems = signal<TodoItem[]>([]);

  sprintService = inject(SprintService);
  todoService = inject(TodoService);

  get paths() {
    return [new PathItem('Sprints', '/sprints'), new PathItem('Detail', '')];
  }

  get todaysItems() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return this.todoItems()
      .filter(
        (item) =>
          !item.completed &&
          item.date &&
          AppHelper.convertToDate(item.date) <= todayDate
      )
      .map((item) => new PathItem(item.text, ''));
  }

  ngOnInit() {
    this.sprintService.getById(+this.id()).subscribe({
      next: (res) => {
        this.sprint.set(res.sprint);

        const dateRange: Date[] = [];
        const date = AppHelper.convertToDate(res.sprint.startDate);
        const endDate = AppHelper.convertToDate(res.sprint.endDate);
        while (date <= endDate) {
          dateRange.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        this.dateRange.set(dateRange);
      },
    });

    this.loadTodoItems();
  }

  loadTodoItems() {
    this.todoService.getSprintTodoItems(+this.id()).subscribe({
      next: (res) => {
        this.todoItems.set(res.todoItems);

        console.log(res.todoItems);
      },
    });
  }

  toggleCompleted(todoItem: TodoItem) {
    this.todoService.toggleCompleted(todoItem).subscribe({
      complete: () => this.loadTodoItems(),
    });
  }

  updateDate(id: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.todoService.assignDate(id, value).subscribe({
      next: () => this.loadTodoItems(),
    });
  }

  convertToString(date: Date | undefined): string | undefined {
    try {
      if (date) {
        const month = this.converToNumberString(date.getMonth() + 1);
        const day = this.converToNumberString(date.getDate());

        return month + '/' + day + '/' + date.getFullYear().toString();
      }
    } catch {}

    return undefined;
  }

  convertToDate(date: Date | undefined) {
    if (date) {
      return AppHelper.convertToDate(date);
    }

    return undefined;
  }

  convertToLongDateString(date: Date) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${weekDays[date.getDay()]}, ${this.converToNumberString(
      date.getDate()
    )} ${months[date.getMonth()]}`;
  }

  converToNumberString(no: number) {
    return no > 9 ? no.toString() : '0' + no.toString();
  }
}

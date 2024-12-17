import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PathItem } from '../../../model/PathItem';

@Component({
  selector: 'app-top-items',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-items.component.html',
  styleUrl: './top-items.component.scss',
})
export class TopItemsComponent {
  items = input.required<PathItem[]>();
}

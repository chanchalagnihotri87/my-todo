import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PathItem } from '../../../model/PathItem';

@Component({
  selector: 'app-breadcrum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss',
})
export class BreadcrumComponent {
  paths = input.required<PathItem[]>();
}

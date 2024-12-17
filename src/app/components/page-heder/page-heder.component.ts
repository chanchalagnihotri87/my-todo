import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-heder',
  standalone: true,
  imports: [],
  templateUrl: './page-heder.component.html',
  styleUrl: './page-heder.component.scss',
})
export class PageHederComponent {
  @Input() title: string | undefined = '';
}

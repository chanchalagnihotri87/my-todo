import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import LifeArea from '../../model/LifeArea';
import { LifeAreaService } from '../../services/life-area.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  private lifeAreasService = inject(LifeAreaService);

  lifeAreas = signal<LifeArea[]>([]);

  ngOnInit(): void {
    const subscription = this.lifeAreasService.getLifeAreas().subscribe({
      next: (resData) => {
        console.log(resData);
        this.lifeAreas.set(resData.lifeAreas);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

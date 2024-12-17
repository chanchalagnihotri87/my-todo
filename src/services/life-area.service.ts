import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import AppConstants from '../app/app.constants';
import LifeArea from '../model/LifeArea';

@Injectable({ providedIn: 'root' })
export class LifeAreaService {
  private httpClient = inject(HttpClient);

  lifeAreas = [
    new LifeArea(1, 'Business'),
    new LifeArea(2, 'Health'),
    new LifeArea(3, 'Family'),
    new LifeArea(4, 'Finance'),
    new LifeArea(5, 'Social'),
    new LifeArea(6, 'Creativity'),
  ];

  getLifeAreas() {
    return this.httpClient.get<{ lifeAreas: LifeArea[] }>(
      `${AppConstants.baseAddress}/lifearea-service/lifeareas`
    );
  }

  getById(id: number) {
    return this.httpClient.get<{ lifeArea: LifeArea }>(
      `${AppConstants.baseAddress}/lifearea-service/lifeareas/detail/${id}`
    );
  }

  updatePlan(id: number, plan: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/lifearea-service/lifeareas/plan/${id}`,
      {
        plan: plan,
      }
    );
  }

  updateVision(id: number, vision: string) {
    return this.httpClient.patch(
      `${AppConstants.baseAddress}/lifearea-service/lifeareas/vision/${id}`,
      {
        vision: vision,
      }
    );
  }
}

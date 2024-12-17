import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoalComponent } from './goal/goal.component';
import { LifeAreaComponent } from './life-area/life-area.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ProblemComponent } from './problem/problem.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintsComponent } from './sprints/sprints.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'lifearea/:id',
    component: LifeAreaComponent,
  },
  {
    path: 'problem/:id',
    component: ProblemComponent,
  },
  {
    path: 'goal/:id',
    component: GoalComponent,
  },
  {
    path: 'objective/:id',
    component: ObjectiveComponent,
  },
  {
    path: 'task/:id',
    component: TaskComponent,
  },
  {
    path: 'sprints',
    component: SprintsComponent,
  },
  {
    path: 'sprint/:id',
    component: SprintComponent,
  },
];

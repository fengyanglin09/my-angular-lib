import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  selectCurrentUrl,
  selectError,
  selectLoading,
  selectLogs,
  selectProject,
  selectRouteProjectSummary,
  selectRouteProjectTitle,
  selectView,
} from '../../../state/route-projects/route-projects.selectors';

interface ProjectLink {
  id: string;
  label: string;
  view: string;
}

@Component({
  selector: 'app-lesson-14-route-effects',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-14-route-effects.html',
  styleUrl: './lesson-14-route-effects.css',
})
export class Lesson14RouteEffects {
  private readonly store = inject(Store);

  protected readonly currentUrl = this.store.selectSignal(selectCurrentUrl);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly logs = this.store.selectSignal(selectLogs);
  protected readonly project = this.store.selectSignal(selectProject);
  protected readonly summary = this.store.selectSignal(selectRouteProjectSummary);
  protected readonly title = this.store.selectSignal(selectRouteProjectTitle);
  protected readonly view = this.store.selectSignal(selectView);

  protected readonly projectLinks: ProjectLink[] = [
    {
      id: 'project-101',
      label: 'Checkout',
      view: 'overview',
    },
    {
      id: 'project-202',
      label: 'Analytics',
      view: 'tasks',
    },
    {
      id: 'project-303',
      label: 'Support',
      view: 'team',
    },
    {
      id: 'missing-project',
      label: 'Failing route',
      view: 'fail',
    },
  ];
}

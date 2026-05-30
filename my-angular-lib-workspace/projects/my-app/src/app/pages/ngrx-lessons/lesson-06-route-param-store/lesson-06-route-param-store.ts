import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

import { ProjectDetailStore } from './project-detail.store';

@Component({
  selector: 'app-lesson-06-route-param-store',
  imports: [FormsModule, RouterLink],
  providers: [ProjectDetailStore],
  templateUrl: './lesson-06-route-param-store.html',
  styleUrl: './lesson-06-route-param-store.css',
})
export class Lesson06RouteParamStore implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  protected readonly projectStore = inject(ProjectDetailStore);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('projectId') ?? 'project-101'),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((projectId) => this.projectStore.loadProject(projectId));
  }
}

import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, interval, map, Subject } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-25-take-until-destroyed',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-25-take-until-destroyed.html',
  styleUrl: './lesson-25-take-until-destroyed.css',
})
export class Lesson25TakeUntilDestroyed {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly componentEvents$ = new Subject<string>();

  protected readonly projectId = signal('unknown');
  protected readonly tickCount = signal(0);
  protected readonly componentEventCount = signal(0);
  protected readonly logs = signal<string[]>([
    'Subscriptions are active. Leave this lesson to let takeUntilDestroyed clean them up.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Route params can emit many times while the same component instance stays alive.',
      name: 'route params',
      syntax: 'route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe(...)',
    },
    {
      description: 'Intervals never complete on their own, so component cleanup matters.',
      name: 'intervals',
      syntax: 'interval(1000).pipe(takeUntilDestroyed(destroyRef)).subscribe(...)',
    },
    {
      description: 'Subjects owned by the component also need the subscription cleaned up.',
      name: 'component streams',
      syntax: 'componentEvents$.pipe(takeUntilDestroyed(destroyRef)).subscribe(...)',
    },
  ];

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('projectId') ?? 'missing-project'),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((projectId) => {
        this.projectId.set(projectId);
        this.addLog(`Route param subscription received projectId "${projectId}".`);
      });

    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tick) => {
        this.tickCount.set(tick + 1);

        if (tick < 4 || (tick + 1) % 5 === 0) {
          this.addLog(`Interval subscription emitted tick ${tick + 1}.`);
        }
      });

    this.componentEvents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((eventName) => {
        this.componentEventCount.update((count) => count + 1);
        this.addLog(`Component stream subscription received "${eventName}".`);
      });
  }

  protected emitComponentEvent(): void {
    this.componentEvents$.next('manual component event');
  }

  protected clearLog(): void {
    this.logs.set([
      'Log cleared. The subscriptions are still alive until this component is destroyed.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

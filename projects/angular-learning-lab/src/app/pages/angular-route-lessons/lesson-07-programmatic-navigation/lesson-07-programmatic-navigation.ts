import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

interface QueryState {
  filter: string;
  sort: string;
}

@Component({
  selector: 'app-lesson-07-programmatic-navigation',
  imports: [LearningNav, RouterOutlet],
  templateUrl: './lesson-07-programmatic-navigation.html',
  styleUrl: './lesson-07-programmatic-navigation.css',
})
export class Lesson07ProgrammaticNavigation {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private nextLogId = 2;

  protected readonly activePanel = signal('inbox');
  protected readonly queryState = signal<QueryState>({
    filter: 'all',
    sort: 'newest',
  });
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'Programmatic navigation lesson loaded. Use the buttons to navigate from TypeScript.',
    },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Router.navigate accepts route commands, similar to routerLink arrays.',
      name: 'navigate',
      syntax: `router.navigate(['archive'], {
  relativeTo: route
});`,
    },
    {
      description: 'relativeTo makes the commands resolve under the current activated route.',
      name: 'relativeTo',
      syntax: `// current route:
/lesson-07-programmatic-navigation

router.navigate(['archive'], { relativeTo: route })
// becomes /lesson-07-programmatic-navigation/archive`,
    },
    {
      description: 'queryParams writes query string state during navigation.',
      name: 'query params',
      syntax: `router.navigate(['inbox'], {
  relativeTo: route,
  queryParams: { filter: 'unread', sort: 'oldest' }
});`,
    },
    {
      description: 'queryParamsHandling merge keeps existing query params and updates the ones you provide.',
      name: 'merge query',
      syntax: `router.navigate([], {
  relativeTo: route,
  queryParams: { sort: 'oldest' },
  queryParamsHandling: 'merge'
});`,
    },
    {
      description: 'An empty commands array means keep the current path and only apply navigation options like query params.',
      name: 'empty commands',
      syntax: `router.navigate([], {
  relativeTo: route,
  queryParams: { sort: 'oldest' },
  queryParamsHandling: 'merge'
});

// path stays the same
// query params are updated`,
    },
    {
      description: 'The current path is the URL before the question mark. Navigation options are the extra settings passed beside the commands.',
      name: 'path vs options',
      syntax: `/lesson-07-programmatic-navigation/archive?filter=archived&sort=newest

current path:
/lesson-07-programmatic-navigation/archive

navigation options:
{
  queryParams: { sort: 'oldest' },
  queryParamsHandling: 'merge'
}`,
    },
    {
      description: 'navigateByUrl uses a complete URL string. It is direct, but less composable.',
      name: 'navigateByUrl',
      syntax: `router.navigateByUrl(
  '/angular-route-lessons/lesson-07-programmatic-navigation/inbox?filter=all'
);`,
    },
  ];

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => ({
          filter: params.get('filter') ?? 'all',
          sort: params.get('sort') ?? 'newest',
        })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => {
        this.queryState.set(query);
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.addLog(`Navigation ended at ${event.urlAfterRedirects}.`);
      });
  }

  protected childActivated(component: unknown): void {
    const componentName = component?.constructor?.name;
    const panel = componentName === 'NavigationArchivePanel' ? 'archive' : 'inbox';

    this.activePanel.set(panel);
    this.addLog(`Nested outlet activated ${componentName ?? 'UnknownComponent'}.`);
  }

  protected goToInbox(): void {
    void this.router.navigate(['inbox'], {
      relativeTo: this.route,
      queryParams: { filter: 'all', sort: 'newest' },
    });
  }

  protected goToUnreadInbox(): void {
    void this.router.navigate(['inbox'], {
      relativeTo: this.route,
      queryParams: { filter: 'unread', sort: 'newest' },
    });
  }

  protected goToArchive(): void {
    void this.router.navigate(['archive'], {
      relativeTo: this.route,
      queryParams: { filter: 'archived', sort: this.queryState().sort },
    });
  }

  protected sortOldestFirst(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: 'oldest' },
      queryParamsHandling: 'merge',
    });
  }

  protected goByAbsoluteUrl(): void {
    void this.router.navigateByUrl(
      '/angular-route-lessons/lesson-07-programmatic-navigation/inbox?filter=all&sort=newest',
    );
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Navigate again to see Router events.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}

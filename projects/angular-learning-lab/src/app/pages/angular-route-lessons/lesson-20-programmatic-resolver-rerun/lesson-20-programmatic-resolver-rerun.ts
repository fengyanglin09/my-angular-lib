import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import {
  ProgrammaticResolverLogService,
  SupportTicketSnapshot,
} from './programmatic-resolver-log.service';

@Component({
  selector: 'app-lesson-20-programmatic-resolver-rerun',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-20-programmatic-resolver-rerun.html',
  styleUrl: './lesson-20-programmatic-resolver-rerun.css',
})
export class Lesson20ProgrammaticResolverRerun {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly log = inject(ProgrammaticResolverLogService);

  readonly refreshId = input<string | undefined>();
  readonly ticket = input<SupportTicketSnapshot | undefined>();
  readonly ticketId = input.required<string>();

  protected readonly currentRefreshId = computed(() => this.refreshId() ?? 'initial-load');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Angular does not expose a direct resolver.run() method.',
      name: 'no direct API',
      syntax: `// There is no API like this:
resolver.run();

// Resolvers rerun through navigation.`,
    },
    {
      description: 'Programmatic rerun means programmatic navigation.',
      name: 'refresh button',
      syntax: `void this.router.navigate([], {
  relativeTo: this.route,
  queryParams: {
    refreshId: Date.now(),
  },
  queryParamsHandling: 'merge',
});`,
    },
    {
      description: 'The route must allow query-param changes to rerun resolvers.',
      name: 'route policy',
      syntax: `{
  path: 'lesson-20/:ticketId',
  runGuardsAndResolvers:
    'paramsOrQueryParamsChange',
  resolve: {
    ticket: supportTicketResolver
  }
}`,
    },
    {
      description: 'The resolver can read the refresh query param to show why it reran.',
      name: 'resolver reads',
      syntax: `const refreshId =
  route.queryParamMap.get('refreshId')
    ?? 'initial-load';`,
    },
    {
      description: 'Use this when the route-owned data should be refreshed by navigation.',
      name: 'when to use',
      syntax: `good fit:
  retry resolver after failure
  refresh page-level route data
  reload after save

simpler alternative:
  component/service reload method`,
    },
  ];

  protected refreshResolverData(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        refreshId: Date.now().toString(),
      },
      queryParamsHandling: 'merge',
    });
  }
}

import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import {
  ReportSnapshot,
  RunGuardsResolversLogService,
} from './run-guards-resolvers-log.service';

@Component({
  selector: 'app-lesson-19-run-guards-resolvers',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-19-run-guards-resolvers.html',
  styleUrl: './lesson-19-run-guards-resolvers.css',
})
export class Lesson19RunGuardsResolvers {
  protected readonly log = inject(RunGuardsResolversLogService);

  readonly report = input<ReportSnapshot | undefined>();
  readonly reportId = input.required<string>();
  readonly strategyLabel = input<string | undefined>();
  readonly tab = input<string | undefined>();

  protected readonly currentTab = computed(() => this.tab() ?? 'summary');
  protected readonly tabMatchesResolvedData = computed(() => {
    return this.currentTab() === this.report()?.resolvedTab;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'By default, guards and resolvers rerun when route params change.',
      name: 'default behavior',
      syntax: `{
  path: 'default/:reportId',
  component: Lesson19,
  resolve: { report: reportResolver }
}

// changing :reportId reruns resolver
// changing ?tab does not`,
    },
    {
      description: 'A route can opt into rerunning when query params change too.',
      name: 'query-aware',
      syntax: `{
  path: 'query-aware/:reportId',
  runGuardsAndResolvers:
    'paramsOrQueryParamsChange',
  resolve: { report: reportResolver }
}`,
    },
    {
      description: 'The same component can receive live query params through component input binding.',
      name: 'input binding',
      syntax: `readonly tab =
  input<string | undefined>();

readonly report =
  input<ReportSnapshot | undefined>();`,
    },
    {
      description: 'This matters when resolver data depends on query params.',
      name: 'why it matters',
      syntax: `query param changes:
  tab input updates

resolver result updates only if:
  runGuardsAndResolvers says it should`,
    },
    {
      description: 'Use query-aware reruns only when the resolver or guard really depends on query params.',
      name: 'when to use',
      syntax: `good fit:
  resolver loads tab-specific data
  guard checks query-driven mode

avoid:
  expensive resolver
  query only changes display state`,
    },
  ];
}

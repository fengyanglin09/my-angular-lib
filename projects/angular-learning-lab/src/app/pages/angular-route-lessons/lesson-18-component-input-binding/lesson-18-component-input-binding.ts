import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { InputBindingWorkspace } from './component-input-workspace.resolver';

@Component({
  selector: 'app-lesson-18-component-input-binding',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-18-component-input-binding.html',
  styleUrl: './lesson-18-component-input-binding.css',
})
export class Lesson18ComponentInputBinding {
  readonly accessLevel = input<string | undefined>();
  readonly mode = input<string | undefined>();
  readonly workspace = input<InputBindingWorkspace | undefined>();
  readonly workspaceId = input.required<string>();

  protected readonly effectiveMode = computed(() => this.mode() ?? 'summary');
  protected readonly inputLog = signal<string[]>([
    'Waiting for router-bound inputs.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Enable router-to-input binding once at router setup.',
      name: 'router setup',
      syntax: `provideRouter(
  routes,
  withComponentInputBinding()
)`,
    },
    {
      description: 'Route params bind to matching component input names.',
      name: 'path param',
      syntax: `path: 'lesson-18/:workspaceId'

readonly workspaceId =
  input.required<string>();`,
    },
    {
      description: 'The route key and component input name must match.',
      name: 'name matching',
      syntax: `path: ':workspaceId'
  binds to input named workspaceId

data: { accessLevel: 'Reader' }
  binds to input named accessLevel

resolve: { workspace: resolver }
  binds to input named workspace`,
    },
    {
      description: 'Query params also bind by name. Missing query params become undefined.',
      name: 'query param',
      syntax: `URL: /workspace-101?mode=details

readonly mode =
  input<string | undefined>();`,
    },
    {
      description: 'Static route data binds to inputs with the same key.',
      name: 'route data',
      syntax: `data: {
  accessLevel: 'Workspace Reader'
}

readonly accessLevel =
  input<string | undefined>();`,
    },
    {
      description: 'Resolver data binds to inputs too, and has the highest precedence when names collide.',
      name: 'resolver data',
      syntax: `resolve: {
  workspace: workspaceResolver
}

readonly workspace =
  input<Workspace | undefined>();`,
    },
    {
      description: 'This is useful when the component only needs route values, not the full ActivatedRoute API.',
      name: 'when to use',
      syntax: `good fit:
  route params
  query params
  static data
  resolver data

use ActivatedRoute when:
  you need route tree APIs
  custom stream composition`,
    },
  ];

  constructor() {
    effect(() => {
      const workspaceName = this.workspace()?.name ?? 'loading workspace';

      this.inputLog.update((logs) => [
        ...logs.slice(-5),
        `Inputs updated: ${this.workspaceId()} / ${this.effectiveMode()} / ${workspaceName}.`,
      ]);
    });
  }
}

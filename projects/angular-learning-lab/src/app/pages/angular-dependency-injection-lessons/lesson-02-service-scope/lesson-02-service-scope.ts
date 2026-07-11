import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { ServiceScopeDemo } from './service-scope-demo';

export const dependencyInjectionLesson02 = {
  number: 2,
  route: 'lesson-02-service-scope',
  title: 'Service Scope',
  intro:
    'Service scope is about where a provider is registered. That location decides who shares the same service instance.',
  keyPoints: [
    'Root providers are shared across the app.',
    'Route providers are shared inside a route branch.',
    'Component providers create a new instance for that component subtree.',
  ],
  mentalModel: `root injector
  app-wide singleton

route injector
  shared by a route branch

component injector
  isolated for that component subtree`,
  demo: {
    title: 'Two panels use a counter service',
    before: 'Root provider means both panels see the same counter.',
    after: 'Component provider means each panel gets its own counter.',
    actionLabel: 'Toggle shared vs isolated view',
  },
  codeSteps: [
    {
      name: 'Root scope',
      description:
        'One instance is shared anywhere the app injects this service.',
      syntax: `@Injectable({ providedIn: 'root' })
export class UserSessionService {
  readonly user = signal<User | null>(null);
}`,
    },
    {
      name: 'Route scope',
      description: 'Route providers are useful for feature-specific state.',
      syntax: `{
  path: 'admin',
  providers: [AdminWorkspaceService],
  loadChildren: () => import('./admin.routes'),
}`,
    },
    {
      name: 'Component scope',
      description:
        'Component providers isolate state for each component instance.',
      syntax: `@Component({
  selector: 'app-editor',
  providers: [EditorDraftService],
})
export class EditorComponent {}`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-02-service-scope',
  imports: [DependencyInjectionLessonPage, ServiceScopeDemo],
  templateUrl: './lesson-02-service-scope.html',
  styleUrl: './lesson-02-service-scope.css',
})
export class DependencyInjectionLesson02ServiceScope {
  protected readonly lesson = dependencyInjectionLesson02;
}

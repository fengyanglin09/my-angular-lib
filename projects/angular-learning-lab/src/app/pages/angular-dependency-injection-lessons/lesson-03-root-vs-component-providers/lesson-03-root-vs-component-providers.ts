import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { RootVsComponentProvidersDemo } from './root-vs-component-providers-demo';

export const dependencyInjectionLesson03 = {
  number: 3,
  route: 'lesson-03-root-vs-component-providers',
  title: 'Root vs Component Providers',
  intro:
    'Root services are good for shared app state or stateless APIs. Component providers are good for local, resettable state tied to a component instance.',
  keyPoints: [
    'Use root for stateless API clients and app-wide session state.',
    'Use component providers for local draft state, wizard state, or isolated widget state.',
    'A component provider shadows a root provider for that component subtree.',
  ],
  mentalModel: `root provider
  one shared instance
  long lived

component provider
  new instance per component
  destroyed with component

nearest provider wins`,
  demo: {
    title: 'Editor draft service',
    before:
      'Root draft service would leak one editor draft into another editor.',
    after: 'Component provider gives every editor its own draft service.',
    actionLabel: 'Create isolated editor instance',
  },
  codeSteps: [
    {
      name: 'Root API client',
      description: 'API clients usually do not hold per-component UI state.',
      syntax: `@Injectable({ providedIn: 'root' })
export class ProjectsApi {
  private readonly http = inject(HttpClient);
}`,
    },
    {
      name: 'Component draft service',
      description:
        'A draft service can be recreated for every editor component.',
      syntax: `@Component({
  providers: [ProjectDraftService],
})
export class ProjectEditor {
  readonly draft = inject(ProjectDraftService);
}`,
    },
    {
      name: 'Shadowing',
      description:
        'If both root and component provide the same token, the closest provider is used.',
      syntax: `Component injector
  ProjectDraftService -> local instance

Root injector
  ProjectDraftService -> fallback instance`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-03-root-vs-component-providers',
  imports: [DependencyInjectionLessonPage, RootVsComponentProvidersDemo],
  templateUrl: './lesson-03-root-vs-component-providers.html',
  styleUrl: './lesson-03-root-vs-component-providers.css',
})
export class DependencyInjectionLesson03RootVsComponentProviders {
  protected readonly lesson = dependencyInjectionLesson03;
}

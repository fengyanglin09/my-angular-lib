import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { SharedVsIsolatedStateDemo } from './shared-vs-isolated-state-demo';

export const dependencyInjectionLesson07 = {
  number: 7,
  route: 'lesson-07-shared-vs-isolated-state',
  title: 'Shared vs Isolated Service State',
  intro:
    'A service with signals, subjects, or mutable fields has state. Provider scope decides whether that state is shared by many consumers or isolated per feature/component.',
  keyPoints: [
    'Shared state is useful for auth session, app preferences, and caches.',
    'Isolated state is useful for editors, dialogs, tabs, and repeated widgets.',
    'Before choosing a provider scope, ask who should see the same state changes.',
  ],
  mentalModel: `service has state
  signal, subject, array, cache

root provider
  everyone sees same state

component provider
  each component gets private state`,
  demo: {
    title: 'Two widgets with service state',
    before: 'Root provider: clicking widget A updates widget B.',
    after: 'Component provider: widget A and B change independently.',
    actionLabel: 'Compare state sharing',
  },
  codeSteps: [
    {
      name: 'Stateful service',
      description: 'This service is not just functions; it remembers state.',
      syntax: `@Injectable()
export class TabStateService {
  readonly activeTab = signal('overview');
}`,
    },
    {
      name: 'Shared instance',
      description: 'providedIn root makes all tab widgets share one activeTab.',
      syntax: `@Injectable({ providedIn: 'root' })
export class TabStateService {}`,
    },
    {
      name: 'Isolated instance',
      description:
        'Providing the service at the component creates independent tab state per widget.',
      syntax: `@Component({
  providers: [TabStateService],
})
export class TabWidget {}`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-07-shared-vs-isolated-state',
  imports: [DependencyInjectionLessonPage, SharedVsIsolatedStateDemo],
  templateUrl: './lesson-07-shared-vs-isolated-state.html',
  styleUrl: './lesson-07-shared-vs-isolated-state.css',
})
export class DependencyInjectionLesson07SharedVsIsolatedState {
  protected readonly lesson = dependencyInjectionLesson07;
}

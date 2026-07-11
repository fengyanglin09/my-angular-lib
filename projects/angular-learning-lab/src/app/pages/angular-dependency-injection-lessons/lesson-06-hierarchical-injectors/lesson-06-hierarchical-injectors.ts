import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { HierarchicalInjectorsDemo } from './hierarchical-injectors-demo';

export const dependencyInjectionLesson06 = {
  number: 6,
  route: 'lesson-06-hierarchical-injectors',
  title: 'Hierarchical Injectors',
  intro:
    'Angular injectors form a tree. When a class asks for a dependency, Angular starts near that class and walks upward until it finds a provider.',
  keyPoints: [
    'The closest provider wins.',
    'Child components can override a parent or root provider.',
    'This is why provider location changes whether state is shared or isolated.',
  ],
  mentalModel: `component asks for token
  start at component injector

not found?
  check parent injector

not found?
  check route/root injectors

found?
  return nearest instance`,
  demo: {
    title: 'Theme token override',
    before: 'The app root provides theme = light.',
    after: 'A feature shell provides theme = dark for its subtree only.',
    actionLabel: 'Resolve nearest provider',
  },
  codeSteps: [
    {
      name: 'Root provider',
      description:
        'This value is available app-wide unless a closer provider overrides it.',
      syntax: `providers: [
  { provide: THEME_NAME, useValue: 'light' },
]`,
    },
    {
      name: 'Feature override',
      description:
        'A feature shell can provide a different value for its children.',
      syntax: `@Component({
  providers: [
    { provide: THEME_NAME, useValue: 'dark' },
  ],
})
export class AdminShell {}`,
    },
    {
      name: 'Child reads nearest',
      description: 'A child under AdminShell receives dark, not light.',
      syntax: `readonly theme = inject(THEME_NAME);`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-06-hierarchical-injectors',
  imports: [DependencyInjectionLessonPage, HierarchicalInjectorsDemo],
  templateUrl: './lesson-06-hierarchical-injectors.html',
  styleUrl: './lesson-06-hierarchical-injectors.css',
})
export class DependencyInjectionLesson06HierarchicalInjectors {
  protected readonly lesson = dependencyInjectionLesson06;
}

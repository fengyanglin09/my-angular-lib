import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { ComponentCommunicationDemo } from './component-communication-demo';

export const componentLesson07 = {
  number: 7,
  route: 'lesson-07-component-communication',
  title: 'Component Communication Patterns',
  intro:
    'Angular components can communicate through inputs/outputs, shared services, route state, or stores. The right choice depends on distance and ownership.',
  keyPoints: [
    'Parent-child communication should usually start with input and output.',
    'Sibling or distant components often need a shared service or store.',
    'URL state is best for state that should survive refresh or be shareable.',
  ],
  mentalModel: `near components
  input/output

siblings
  shared service

app-wide state
  store

shareable navigation state
  router`,
  demo: {
    title: 'Sibling filters update a result panel through a parent',
    before: 'Filter panel emits selectedCategory.',
    after: 'Parent updates results panel input.',
    actionLabel: 'Simulate filter change',
  },
  codeSteps: [
    {
      name: 'Child emits intent',
      description: 'The filter panel reports what changed.',
      syntax: `categoryChanged = output<string>();

selectCategory(category: string): void {
  this.categoryChanged.emit(category);
}`,
    },
    {
      name: 'Parent coordinates',
      description:
        'The parent receives the event and updates sibling input state.',
      syntax: `<app-filter-panel
  (categoryChanged)="category.set($event)"
/>

<app-results-panel
  [category]="category()"
/>`,
    },
    {
      name: 'Escalate only when needed',
      description:
        'Use services/stores when passing through many component layers becomes noisy.',
      syntax: `Start local.
Move to a service or store when the state has many consumers.`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-07-component-communication',
  imports: [ComponentsLessonPage, ComponentCommunicationDemo],
  templateUrl: './lesson-07-component-communication.html',
  styleUrl: './lesson-07-component-communication.css',
})
export class ComponentsLesson07ComponentCommunication {
  protected readonly lesson = componentLesson07;
}

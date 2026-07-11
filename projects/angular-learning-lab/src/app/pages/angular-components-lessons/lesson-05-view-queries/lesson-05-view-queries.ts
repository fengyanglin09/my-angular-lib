import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { ViewQueriesDemo } from './view-queries-demo';

export const componentLesson05 = {
  number: 5,
  route: 'lesson-05-view-queries',
  title: 'View Queries',
  intro:
    'View queries let a component read elements or child components that are declared inside its own template.',
  keyPoints: [
    'viewChild reads one matching thing from this component view.',
    'viewChildren reads all matching things from this component view.',
    'Use view queries for focus, measurement, scrolling, and child component APIs.',
  ],
  mentalModel: `component template
  contains input, cards, child components

viewChild/viewChildren
  read things from that own template

not for
  projected parent content`,
  demo: {
    title: 'Focus the search input after adding a saved view',
    before: 'Component has an input and a list in its own template.',
    after: 'viewChild can focus the input after an action.',
    actionLabel: 'Simulate focus action',
  },
  codeSteps: [
    {
      name: 'Read one element',
      description: 'The reference name comes from the component template.',
      syntax: `searchInput =
  viewChild.required<ElementRef<HTMLInputElement>>('searchInput');`,
    },
    {
      name: 'Read many elements',
      description:
        'viewChildren returns a signal-like query list of all matches.',
      syntax: `cards = viewChildren<ElementRef<HTMLElement>>('card');`,
    },
    {
      name: 'Use after render',
      description: 'DOM work should happen after Angular renders the element.',
      syntax: `afterNextRender(() => {
  this.searchInput().nativeElement.focus();
});`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-05-view-queries',
  imports: [ComponentsLessonPage, ViewQueriesDemo],
  templateUrl: './lesson-05-view-queries.html',
  styleUrl: './lesson-05-view-queries.css',
})
export class ComponentsLesson05ViewQueries {
  protected readonly lesson = componentLesson05;
}

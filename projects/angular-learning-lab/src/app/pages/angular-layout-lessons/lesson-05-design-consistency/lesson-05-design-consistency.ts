import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { DesignConsistencyDemo } from './design-consistency-demo';

export const layoutLesson05 = {
  number: 5,
  route: 'lesson-05-design-consistency',
  title: 'Design Consistency',
  intro:
    'Design consistency comes from reusable primitives, shared spacing rules, and predictable page patterns, not from copying CSS between screens.',
  keyPoints: [
    'Centralize common layout primitives and page patterns.',
    'Prefer shared classes or components for repeated UI structure.',
    'Use feature CSS for feature-specific arrangement, not global design rules.',
  ],
  mentalModel: `design system
  colors
  spacing
  buttons
  cards

page patterns
  list page
  detail page
  dashboard

feature CSS
  local layout only`,
  demo: {
    title: 'Shared lesson layout CSS',
    before: 'Each lesson defines its own panel, card, and pre styles.',
    after: 'A shared layout stylesheet keeps lessons visually consistent.',
    actionLabel: 'Apply shared pattern',
  },
  codeSteps: [
    {
      name: 'Shared stylesheet',
      description: 'Common lesson/page primitives belong in one shared place.',
      syntax: `@import "./app/core/layout/lesson-layout.shared.css";`,
    },
    {
      name: 'Common primitives',
      description: 'Reuse class names for repeated structures.',
      syntax: `<main class="lesson-shell">
  <section class="lesson-intro">...</section>
  <section class="flow-panel">...</section>
</main>`,
    },
    {
      name: 'Feature-specific CSS',
      description: 'Local CSS can still define page-specific grids and states.',
      syntax: `.dashboard-grid {
  grid-template-columns: minmax(0, 1fr) 320px;
}`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-05-design-consistency',
  imports: [LayoutLessonPage, DesignConsistencyDemo],
  templateUrl: './lesson-05-design-consistency.html',
  styleUrl: './lesson-05-design-consistency.css',
})
export class LayoutLesson05DesignConsistency {
  protected readonly lesson = layoutLesson05;
}

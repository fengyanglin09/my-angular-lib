import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { ReusablePageLayoutsDemo } from './reusable-page-layouts-demo';

export const layoutLesson04 = {
  number: 4,
  route: 'lesson-04-reusable-page-layouts',
  title: 'Reusable Page Layouts',
  intro:
    'Reusable page layouts keep repeated page structure consistent without forcing every feature to build the same header, toolbar, and content regions.',
  keyPoints: [
    'Use layout components for repeated structure.',
    'Use content projection for page-specific actions and body content.',
    'Avoid page layouts that know feature-specific business logic.',
  ],
  mentalModel: `page layout component
  title area
  actions slot
  body slot

feature page
  supplies content
  owns business logic`,
  demo: {
    title: 'Entity detail page layout',
    before: 'Every detail page recreates title, actions, and tabs.',
    after: 'A reusable layout provides structure and slots.',
    actionLabel: 'Swap projected page action',
  },
  codeSteps: [
    {
      name: 'Layout slots',
      description:
        'Projection lets the layout own frame while callers own content.',
      syntax: `<section class="page-layout">
  <header>
    <ng-content select="[pageTitle]" />
    <ng-content select="[pageActions]" />
  </header>
  <ng-content select="[pageBody]" />
</section>`,
    },
    {
      name: 'Feature usage',
      description: 'The feature page supplies title, actions, and body.',
      syntax: `<app-page-layout>
  <h1 pageTitle>Order 1001</h1>
  <button pageActions>Save</button>
  <app-order-detail pageBody />
</app-page-layout>`,
    },
    {
      name: 'Keep logic out',
      description:
        'The layout should not know how orders, users, or invoices save.',
      syntax: `Layout owns structure.
Feature owns decisions.`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-04-reusable-page-layouts',
  imports: [LayoutLessonPage, ReusablePageLayoutsDemo],
  templateUrl: './lesson-04-reusable-page-layouts.html',
  styleUrl: './lesson-04-reusable-page-layouts.css',
})
export class LayoutLesson04ReusablePageLayouts {
  protected readonly lesson = layoutLesson04;
}

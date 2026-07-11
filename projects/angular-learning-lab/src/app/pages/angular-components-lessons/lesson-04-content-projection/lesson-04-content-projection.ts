import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { ContentProjectionDemo } from './content-projection-demo';

export const componentLesson04 = {
  number: 4,
  route: 'lesson-04-content-projection',
  title: 'Content Projection',
  intro:
    'Content projection lets a reusable component provide structure while the parent provides custom content with ng-content slots.',
  keyPoints: [
    'Use ng-content when the parent should own the markup.',
    'Use select attributes to create named slots.',
    'Projection is great for cards, dialogs, tabs, menus, and layout shells.',
  ],
  mentalModel: `child component
  owns frame and layout

parent component
  owns projected content

ng-content
  marks where parent content appears`,
  demo: {
    title: 'Card shell with projected header, body, and action',
    before: 'The card component owns border and layout.',
    after: 'The parent supplies title, details, and buttons.',
    actionLabel: 'Switch projected action',
  },
  codeSteps: [
    {
      name: 'Card shell',
      description: 'The reusable component declares slots with select.',
      syntax: `<header>
  <ng-content select="[cardTitle]" />
  <ng-content select="[cardAction]" />
</header>

<section>
  <ng-content select="[cardBody]" />
</section>`,
    },
    {
      name: 'Parent content',
      description: 'The parent marks content for each slot.',
      syntax: `<app-card-shell>
  <h3 cardTitle>Billing</h3>
  <button cardAction>Refresh</button>
  <p cardBody>Invoices and payment status.</p>
</app-card-shell>`,
    },
    {
      name: 'When to use',
      description:
        'Projection is useful when inputs would make the component too rigid.',
      syntax: `Use inputs for simple values.
Use projection for custom markup.`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-04-content-projection',
  imports: [ComponentsLessonPage, ContentProjectionDemo],
  templateUrl: './lesson-04-content-projection.html',
  styleUrl: './lesson-04-content-projection.css',
})
export class ComponentsLesson04ContentProjection {
  protected readonly lesson = componentLesson04;
}

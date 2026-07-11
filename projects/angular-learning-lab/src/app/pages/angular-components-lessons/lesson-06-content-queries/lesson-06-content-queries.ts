import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { ContentQueriesDemo } from './content-queries-demo';

export const componentLesson06 = {
  number: 6,
  route: 'lesson-06-content-queries',
  title: 'Content Queries',
  intro:
    'Content queries read projected content: things the parent placed inside the child component with ng-content.',
  keyPoints: [
    'contentChild reads one projected directive, component, or element reference.',
    'contentChildren reads all matching projected items.',
    'Use directives for stable semantic queries instead of depending on raw tag names.',
  ],
  mentalModel: `parent projects content
  buttons, titles, custom markup

child component
  renders ng-content slots
  can inspect projected content with content queries`,
  demo: {
    title: 'Toolbar shell counts projected actions',
    before: 'Parent projects one or more action buttons.',
    after: 'Child can read projected action directives.',
    actionLabel: 'Toggle projected action',
  },
  codeSteps: [
    {
      name: 'Marker directive',
      description: 'A directive gives projected content a stable API to query.',
      syntax: `@Directive({ selector: '[appToolbarAction]' })
export class ToolbarAction {
  label = input('Action');
}`,
    },
    {
      name: 'Read projected actions',
      description:
        'The child queries projected directive instances, not its own view.',
      syntax: `actions = contentChildren(ToolbarAction);`,
    },
    {
      name: 'Projected template',
      description:
        'The parent supplies content that the child can render and inspect.',
      syntax: `<app-toolbar-shell>
  <button appToolbarAction label="Refresh">Refresh</button>
</app-toolbar-shell>`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-06-content-queries',
  imports: [ComponentsLessonPage, ContentQueriesDemo],
  templateUrl: './lesson-06-content-queries.html',
  styleUrl: './lesson-06-content-queries.css',
})
export class ComponentsLesson06ContentQueries {
  protected readonly lesson = componentLesson06;
}

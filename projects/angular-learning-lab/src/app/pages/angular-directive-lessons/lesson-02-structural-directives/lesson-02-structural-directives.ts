import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { UnlessDemo } from './unless-demo';

export const directiveLesson02 = {
  number: 2,
  route: 'lesson-02-structural-directives',
  title: 'Structural Directives',
  intro:
    'Structural directives change template structure by creating, moving, or clearing embedded views.',
  keyPoints: [
    'Structural directives usually use `*` shorthand in templates.',
    'They work with `TemplateRef` and `ViewContainerRef`.',
    'Use them when the question is whether template content should exist.',
  ],
  mentalModel: `template block
  becomes TemplateRef

directive decides
  create embedded view
  or clear view container`,
  demo: {
    title: 'Unless-style rendering',
    before: 'The archived message is represented by a template.',
    after: 'The directive creates or clears that template view.',
    actionLabel: 'Run structural directive demo',
  },
  codeSteps: [
    {
      name: 'Inject template tools',
      description:
        'A structural directive receives the template and a container.',
      syntax: `private templateRef = inject(TemplateRef);
private viewContainer = inject(ViewContainerRef);`,
    },
    {
      name: 'Create view',
      description: 'Creating an embedded view makes the template appear.',
      syntax: `this.viewContainer.createEmbeddedView(this.templateRef);`,
    },
    {
      name: 'Clear view',
      description: 'Clearing the container removes the rendered template.',
      syntax: `this.viewContainer.clear();`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-02-structural-directives',
  imports: [DirectiveLessonPage, UnlessDemo],
  templateUrl: './lesson-02-structural-directives.html',
  styleUrl: './lesson-02-structural-directives.css',
})
export class DirectiveLesson02StructuralDirectives {
  protected readonly lesson = directiveLesson02;
}

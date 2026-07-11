import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { PermissionDemo } from './permission-demo';

export const directiveLesson06 = {
  number: 6,
  route: 'lesson-06-permission-feature-flag',
  title: 'Permission And Feature Flag Directives',
  intro:
    'Permission directives centralize repeated UI access checks, but they do not replace backend authorization.',
  keyPoints: [
    'Use a directive to avoid scattering permission conditions across many templates.',
    'Hide UI for user experience; still enforce access on the backend.',
    'Keep the directive input shape explicit so permissions are easy to review.',
  ],
  mentalModel: `template wants action
  directive checks rule

role passes
feature passes
  render view

otherwise
  no view`,
  demo: {
    title: 'Role and feature gated action',
    before: 'The refund action is just another template block.',
    after: 'The directive renders it only when access rules pass.',
    actionLabel: 'Run permission directive demo',
  },
  codeSteps: [
    {
      name: 'Rule input',
      description: 'Pass the data needed to decide whether to render.',
      syntax: `*appCanAccess="{
  userRole: role(),
  requiredRole: 'manager',
  featureEnabled: featureEnabled(),
}"`,
    },
    {
      name: 'Check rule',
      description: 'The directive converts rule data into a yes/no decision.',
      syntax: `const canAccess =
  rule.featureEnabled &&
  roleRank[rule.userRole] >= roleRank[rule.requiredRole];`,
    },
    {
      name: 'Render or clear',
      description:
        'The directive owns view creation, not the component template.',
      syntax: `canAccess
  ? viewContainer.createEmbeddedView(templateRef)
  : viewContainer.clear();`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-06-permission-feature-flag',
  imports: [DirectiveLessonPage, PermissionDemo],
  templateUrl: './lesson-06-permission-feature-flag.html',
  styleUrl: './lesson-06-permission-feature-flag.css',
})
export class DirectiveLesson06PermissionFeatureFlag {
  protected readonly lesson = directiveLesson06;
}

import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { RoleBasedUiDemo } from './role-based-ui-demo';

export const authLesson04 = {
  number: 4,
  route: 'lesson-04-role-based-ui',
  title: 'Role-Based UI',
  intro:
    'Role-based UI hides or shows affordances based on permissions. It improves usability, but backend authorization must still enforce the real security boundary.',
  keyPoints: [
    'Use role-based UI to avoid showing actions the user cannot take.',
    'Do not treat hidden buttons as security.',
    'Prefer named permission checks over scattering role string comparisons everywhere.',
  ],
  mentalModel: `backend auth
  real enforcement

frontend permissions
  helpful UI decisions

permission helper
  one place to ask canEdit, canDelete, canApprove`,
  demo: {
    title: 'Manager sees approve button',
    before: 'Viewer can read the page but cannot approve.',
    after: 'Manager role enables the approve action.',
    actionLabel: 'Switch role',
  },
  codeSteps: [
    {
      name: 'Permission helper',
      description: 'Wrap permission checks in a service or computed helper.',
      syntax: `canApproveOrder = computed(() =>
  this.currentUser()?.roles.includes('manager') ?? false
);`,
    },
    {
      name: 'Template gate',
      description: 'Show UI only when the permission check passes.',
      syntax: `@if (permissions.canApproveOrder()) {
  <button type="button">Approve order</button>
}`,
    },
    {
      name: 'Backend still checks',
      description:
        'The API must reject unauthorized actions even if someone calls it manually.',
      syntax: `POST /orders/123/approve
Authorization: Bearer token`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-04-role-based-ui',
  imports: [AuthLessonPage, RoleBasedUiDemo],
  templateUrl: './lesson-04-role-based-ui.html',
  styleUrl: './lesson-04-role-based-ui.css',
})
export class AuthLesson04RoleBasedUi {
  protected readonly lesson = authLesson04;
}

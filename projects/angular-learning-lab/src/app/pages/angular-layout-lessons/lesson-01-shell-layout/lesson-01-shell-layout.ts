import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { ShellLayoutDemo } from './shell-layout-demo';

export const layoutLesson01 = {
  number: 1,
  route: 'lesson-01-shell-layout',
  title: 'Shell Layout',
  intro:
    'A shell layout is the stable frame around feature pages: navigation, header, content outlet, and app-level page chrome.',
  keyPoints: [
    'The shell owns persistent layout, not feature-specific details.',
    'Feature pages render inside the shell outlet.',
    'A good shell keeps navigation and page chrome consistent.',
  ],
  mentalModel: `app shell
  top bar
  side nav
  main outlet

feature page
  owns page content

router
  swaps feature content inside shell`,
  demo: {
    title: 'Workspace shell wraps project pages',
    before: 'Each page repeats header and navigation.',
    after: 'Shell owns frame; pages focus on content.',
    actionLabel: 'Switch shell section',
  },
  codeSteps: [
    {
      name: 'Shell route',
      description:
        'A parent route can render the shell and child pages inside it.',
      syntax: `{
  path: 'workspace',
  component: WorkspaceShell,
  children: workspaceRoutes,
}`,
    },
    {
      name: 'Shell template',
      description:
        'The shell provides stable layout around the active child route.',
      syntax: `<app-topnav />
<app-sidenav />
<main>
  <router-outlet />
</main>`,
    },
    {
      name: 'Feature page',
      description: 'Feature pages should not recreate the app frame.',
      syntax: `@Component({
  template: '<app-project-dashboard />',
})
export class ProjectDashboardPage {}`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-01-shell-layout',
  imports: [LayoutLessonPage, ShellLayoutDemo],
  templateUrl: './lesson-01-shell-layout.html',
  styleUrl: './lesson-01-shell-layout.css',
})
export class LayoutLesson01ShellLayout {
  protected readonly lesson = layoutLesson01;
}

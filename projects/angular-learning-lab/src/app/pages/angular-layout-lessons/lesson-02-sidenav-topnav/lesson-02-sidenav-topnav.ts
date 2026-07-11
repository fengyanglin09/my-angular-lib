import { Component } from '@angular/core';

import type { LayoutLesson } from '../angular-layout-lessons.models';
import { LayoutLessonPage } from '../layout-lesson-page/layout-lesson-page';
import { SidenavTopnavShellExample } from './sidenav-topnav-shell-example';

export const layoutLesson02 = {
  number: 2,
  route: 'lesson-02-sidenav-topnav',
  title: 'Sidenav And Topnav',
  intro:
    'Navigation layout should separate global navigation, feature navigation, and page actions so users always know where they are and what they can do.',
  keyPoints: [
    'Topnav is usually global identity, search, user menu, and app-level actions.',
    'Sidenav is often feature navigation and can group major categories with submenu items.',
    'Page-level actions belong near the page heading, not hidden in global nav.',
  ],
  mentalModel: `topnav
  app-wide controls

sidenav
  feature navigation
  expandable groups

page header
  current page title and actions`,
  demo: {
    title: 'Settings area navigation',
    before: 'All actions are mixed into one nav bar.',
    after: 'Global, feature, and page actions are separated.',
    actionLabel: 'Toggle nav density',
  },
  codeSteps: [
    {
      name: 'Shell composition',
      description:
        'The shell composes dedicated topnav and sidenav components.',
      syntax: `<app-layout-topnav-example
  (menuToggled)="toggleSidenav()"
/>

<app-layout-sidenav-example
  [activeSection]="activeSection()"
  (sectionSelected)="selectSection($event)"
/>`,
    },
    {
      name: 'Sidenav input/output',
      description:
        'The sidenav receives the active menu item and emits submenu selection.',
      syntax: `activeSection = input('workspace-overview');
sectionSelected = output<string>();

selectItem(itemId: string): void {
  this.sectionSelected.emit(itemId);
}`,
    },
    {
      name: 'Expandable groups',
      description: 'The sidenav owns local expanded/collapsed UI state.',
      syntax: `expandedGroups = signal(new Set(['workspace']));

toggleGroup(groupId: string): void {
  this.expandedGroups.update((groups) => {
    const next = new Set(groups);
    next.has(groupId) ? next.delete(groupId) : next.add(groupId);
    return next;
  });
}`,
    },
    {
      name: 'Responsive shell',
      description:
        'Small screens can stack the sidenav above the page content.',
      syntax: `@media (max-width: 760px) {
  .shell-body {
    display: grid;
  }
}`,
    },
  ],
} satisfies LayoutLesson;

@Component({
  selector: 'app-layout-lesson-02-sidenav-topnav',
  imports: [LayoutLessonPage, SidenavTopnavShellExample],
  templateUrl: './lesson-02-sidenav-topnav.html',
  styleUrl: './lesson-02-sidenav-topnav.css',
})
export class LayoutLesson02SidenavTopnav {
  protected readonly lesson = layoutLesson02;
}

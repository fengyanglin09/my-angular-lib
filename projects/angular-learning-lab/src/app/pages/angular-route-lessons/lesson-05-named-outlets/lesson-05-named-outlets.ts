import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

@Component({
  selector: 'app-lesson-05-named-outlets',
  imports: [LearningNav, RouterLink, RouterOutlet],
  templateUrl: './lesson-05-named-outlets.html',
  styleUrl: './lesson-05-named-outlets.css',
})
export class Lesson05NamedOutlets {
  private nextLogId = 2;

  protected readonly primaryOutlet = signal('dashboard');
  protected readonly sidePanelOutlet = signal('closed');
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'Named outlet lesson loaded. The primary outlet starts on dashboard.',
    },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The unnamed outlet is the primary outlet.',
      name: 'primary outlet',
      syntax: `<router-outlet />`,
    },
    {
      description: 'A named outlet creates a second route target in the same component.',
      name: 'named outlet',
      syntax: `<router-outlet name="sidePanel" />`,
    },
    {
      description: 'Routes without an outlet name render in the primary outlet.',
      name: 'primary route',
      syntax: `{ path: 'dashboard', component: AccountDashboard }`,
    },
    {
      description: 'Routes with an outlet name render in that matching named outlet.',
      name: 'named route',
      syntax: `{ path: 'notes',
  outlet: 'sidePanel',
  component: AccountNotesPanel
}`,
    },
    {
      description: 'The outlets object can update primary and named outlets together.',
      name: 'outlet link',
      syntax: `[routerLink]="[{
  outlets: {
    primary: ['details'],
    sidePanel: ['notes']
  }
}]"`,
    },
    {
      description: 'Navigation triggers these events when Angular inserts or removes the component for this outlet.',
      name: 'outlet events',
      syntax: `<router-outlet
  name="sidePanel"
  (activate)="outletActivated('sidePanel', $event)"
  (deactivate)="sidePanelDeactivated()"
/>`,
    },
    {
      description: 'Opening the named outlet activates its component. Setting the outlet to null deactivates it.',
      name: 'event trigger',
      syntax: `[routerLink]="[{ outlets: { sidePanel: ['notes'] } }]"
// triggers activate for AccountNotesPanel

[routerLink]="[{ outlets: { sidePanel: null } }]"
// triggers deactivate for the current sidePanel component`,
    },
    {
      description: 'Use null to close optional named outlets. For the primary outlet, navigate to another primary route instead.',
      name: 'closing outlets',
      syntax: `{ outlets: { sidePanel: null } }
// close optional side panel

{ outlets: { primary: ['dashboard'] } }
// change main page content`,
    },
  ];

  protected outletActivated(outletName: 'primary' | 'sidePanel', component: unknown): void {
    const componentName = component?.constructor?.name ?? 'UnknownComponent';
    const routeName = this.routeNameFromComponent(componentName);

    if (outletName === 'primary') {
      this.primaryOutlet.set(routeName);
    } else {
      this.sidePanelOutlet.set(routeName);
    }

    this.addLog(`${outletName} outlet activated ${componentName}.`);
  }

  protected sidePanelDeactivated(): void {
    this.sidePanelOutlet.set('closed');
    this.addLog('sidePanel outlet deactivated. The named outlet is now closed.');
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Change outlet links to see activations.' }]);
    this.nextLogId = 2;
  }

  private routeNameFromComponent(componentName: string): string {
    if (componentName === 'AccountDetails') {
      return 'details';
    }

    if (componentName === 'AccountNotesPanel') {
      return 'notes';
    }

    if (componentName === 'AccountHelpPanel') {
      return 'help';
    }

    return 'dashboard';
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}

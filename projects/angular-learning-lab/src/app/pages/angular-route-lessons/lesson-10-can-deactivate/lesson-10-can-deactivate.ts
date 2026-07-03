import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { CanDeactivateDemoService } from './can-deactivate-demo.service';

@Component({
  selector: 'app-lesson-10-can-deactivate',
  imports: [LearningNav, RouterLink, RouterOutlet],
  templateUrl: './lesson-10-can-deactivate.html',
  styleUrl: './lesson-10-can-deactivate.css',
})
export class Lesson10CanDeactivate {
  protected readonly demo = inject(CanDeactivateDemoService);
  protected readonly activePanel = signal('editor');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The guarded component exposes a method the guard can call. It can answer now or later.',
      name: 'component contract',
      syntax: `export interface PendingChangesComponent {
  canDeactivateRoute: () =>
    boolean | Promise<boolean>;
}`,
    },
    {
      description: 'The guard receives the current component instance before navigation leaves it.',
      name: 'guard function',
      syntax: `export const pendingChangesGuard:
  CanDeactivateFn<PendingChangesComponent> = (component) =>
    component.canDeactivateRoute();`,
    },
    {
      description: 'Attach canDeactivate to the route that should protect leaving.',
      name: 'route config',
      syntax: `{ path: 'editor',
  component: CanDeactivateEditorPanel,
  canDeactivate: [pendingChangesGuard]
}`,
    },
    {
      description: 'Returning true allows navigation away from the current component immediately.',
      name: 'allow leave',
      syntax: `canDeactivateRoute(): boolean {
  return !this.dirty();
}`,
    },
    {
      description: 'Returning a Promise pauses navigation until the user chooses save, discard, or stay.',
      name: 'ask user',
      syntax: `if (this.dirty()) {
  this.dialogOpen.set(true);
  return new Promise<boolean>((resolve) => {
    this.pendingDecision = resolve;
  });
}`,
    },
    {
      description: 'Resolving true continues the original navigation. Resolving false cancels it.',
      name: 'resolve decision',
      syntax: `saveAndLeave(): void {
  this.saveDraft();
  this.pendingDecision?.(true);
}

stayEditing(): void {
  this.pendingDecision?.(false);
}`,
    },
    {
      description: 'CanDeactivate runs when leaving the guarded route, not when entering it.',
      name: 'when it runs',
      syntax: `editor -> preview
// guard runs

preview -> editor
// editor route is being entered, so this guard does not run`,
    },
  ];

  protected childActivated(component: unknown): void {
    const componentName = component?.constructor?.name;
    this.activePanel.set(
      componentName === 'CanDeactivatePreviewPanel' ? 'preview' : 'editor',
    );
  }
}

import { Component, computed, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { ProjectedAction } from './projected-action';
import { ProjectedCard } from './projected-card';
import { ProjectedTitle } from './projected-title';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

type TitleVariant = 'Dashboard' | 'Reports';

@Component({
  selector: 'app-lesson-11-content-queries',
  imports: [LearningNav, ProjectedAction, ProjectedCard, ProjectedTitle],
  templateUrl: './lesson-11-content-queries.html',
  styleUrl: './lesson-11-content-queries.css',
})
export class Lesson11ContentQueries {
  protected readonly titleVariant = signal<TitleVariant>('Dashboard');
  protected readonly showSecondaryAction = signal(true);
  protected readonly logs = signal<string[]>([
    'The parent projects title, body, and action content into app-projected-card.',
  ]);

  protected readonly titleText = computed(() =>
    this.titleVariant() === 'Dashboard' ? 'Team Dashboard' : 'Monthly Reports',
  );
  protected readonly bodyText = computed(() =>
    this.titleVariant() === 'Dashboard'
      ? 'The card receives dashboard content from the parent, then queries that projected content.'
      : 'The same card receives report content without changing the card implementation.',
  );
  protected readonly actionCount = computed(() => (this.showSecondaryAction() ? 2 : 1));

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Querying a directive gives you the directive instance and its input signals.',
      name: 'directive query',
      syntax: `projectedTitle =
  contentChild(ProjectedTitle)`,
    },
    {
      description: 'Querying the same directive with read: ElementRef gives you the host h3 element.',
      name: 'host element query',
      syntax: `projectedTitleElement =
  contentChild<
    ProjectedTitle,
    ElementRef<HTMLHeadingElement>
  >(ProjectedTitle, {
    read: ElementRef,
  })`,
    },
    {
      description: 'contentChildren reads all projected items that match a directive or reference.',
      name: 'contentChildren',
      syntax: `projectedActions =
  contentChildren(ProjectedAction)`,
    },
    {
      description: 'The parent still owns the projected content; the child only observes it.',
      name: 'projection',
      syntax: `<app-projected-card>
  <h3
    appProjectedTitle
    [titleLabel]="titleText()"
    cardTitle>
    ...
  </h3>
</app-projected-card>`,
    },
    {
      description: 'Use content queries to build flexible shell components, tabs, menus, and forms.',
      name: 'component API',
      syntax: `<button
  appProjectedAction
  cardAction
  actionLabel="Refresh">
  Refresh
</button>`,
    },
  ];

  protected switchTitle(): void {
    this.titleVariant.update((variant) =>
      variant === 'Dashboard' ? 'Reports' : 'Dashboard',
    );
    this.addLog(`Projected title changed to ${this.titleText()}.`);
  }

  protected toggleSecondaryAction(): void {
    this.showSecondaryAction.update((visible) => !visible);
    this.addLog(`Projected actions changed to ${this.actionCount()}.`);
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Change projected content to see queries update.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

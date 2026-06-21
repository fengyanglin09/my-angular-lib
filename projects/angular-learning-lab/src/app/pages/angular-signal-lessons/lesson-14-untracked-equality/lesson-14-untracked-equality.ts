import { Component, computed, effect, signal, untracked } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface SearchFilters {
  category: 'All' | 'Signals' | 'RxJS';
  includeArchived: boolean;
}

interface AuditLog {
  id: number;
  message: string;
}

@Component({
  selector: 'app-lesson-14-untracked-equality',
  imports: [LearningNav],
  templateUrl: './lesson-14-untracked-equality.html',
  styleUrl: './lesson-14-untracked-equality.css',
})
export class Lesson14UntrackedEquality {
  private nextAuditId = 2;

  protected readonly searchQuery = signal('signals');
  protected readonly auditNotes = signal('Audit note A');
  protected readonly filters = signal<SearchFilters>(
    {
      category: 'All',
      includeArchived: false,
    },
    {
      equal: (previous, current) =>
        previous.category === current.category &&
        previous.includeArchived === current.includeArchived,
    },
  );

  protected readonly trackedLogs = signal<AuditLog[]>([
    { id: 1, message: 'Tracked effect is waiting for changes.' },
  ]);
  protected readonly untrackedLogs = signal<AuditLog[]>([
    { id: 1, message: 'Untracked effect is waiting for changes.' },
  ]);
  protected readonly filterLogs = signal<AuditLog[]>([
    { id: 1, message: 'Filter signal uses custom equality.' },
  ]);

  protected readonly searchSummary = computed(
    () =>
      `${this.searchQuery()} in ${this.filters().category} ` +
      `${this.filters().includeArchived ? 'with archived' : 'without archived'}`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A normal effect tracks every signal read inside it.',
      name: 'tracked read',
      syntax: `effect(() => {
  searchQuery();
  auditNotes();
})`,
    },
    {
      description: 'untracked reads a signal without making it a dependency.',
      name: 'untracked read',
      syntax: `effect(() => {
  searchQuery();
  untracked(() => auditNotes());
})`,
    },
    {
      description: 'A custom equality function decides whether a new value counts as a change.',
      name: 'signal equality',
      syntax: `filters = signal(initial, {
  equal: (a, b) =>
    a.category === b.category &&
    a.includeArchived === b.includeArchived
})`,
    },
    {
      description: 'Use these tools carefully; most signals should use the default behavior.',
      name: 'when useful',
      syntax: `ignore incidental reads
skip identical object updates
avoid noisy effect reruns`,
    },
  ];

  constructor() {
    effect(() => {
      const query = this.searchQuery();
      const notes = this.auditNotes();
      this.addTrackedLog(`Tracked effect ran: query "${query}", notes "${notes}".`);
    });

    effect(() => {
      const query = this.searchQuery();
      const notes = untracked(() => this.auditNotes());
      this.addUntrackedLog(`Untracked effect ran: query "${query}", notes snapshot "${notes}".`);
    });

    effect(() => {
      const filters = this.filters();
      this.addFilterLog(
        `Filter effect ran: ${filters.category}, archived ${filters.includeArchived}.`,
      );
    });
  }

  protected updateQuery(value: string): void {
    this.searchQuery.set(value);
  }

  protected updateAuditNotes(value: string): void {
    this.auditNotes.set(value);
  }

  protected setSameFilters(): void {
    const filters = this.filters();
    this.filters.set({ ...filters });
    this.addFilterLog('Set same filter values; equality prevented a rerun.');
  }

  protected toggleArchived(): void {
    this.filters.update((filters) => ({
      ...filters,
      includeArchived: !filters.includeArchived,
    }));
  }

  protected switchCategory(): void {
    this.filters.update((filters) => ({
      ...filters,
      category:
        filters.category === 'All' ? 'Signals' : filters.category === 'Signals' ? 'RxJS' : 'All',
    }));
  }

  protected clearLogs(): void {
    this.trackedLogs.set([{ id: 1, message: 'Tracked log cleared.' }]);
    this.untrackedLogs.set([{ id: 1, message: 'Untracked log cleared.' }]);
    this.filterLogs.set([{ id: 1, message: 'Filter log cleared.' }]);
    this.nextAuditId = 2;
  }

  private addTrackedLog(message: string): void {
    this.trackedLogs.update((logs) => [...logs, this.createLog(message)]);
  }

  private addUntrackedLog(message: string): void {
    this.untrackedLogs.update((logs) => [...logs, this.createLog(message)]);
  }

  private addFilterLog(message: string): void {
    this.filterLogs.update((logs) => [...logs, this.createLog(message)]);
  }

  private createLog(message: string): AuditLog {
    const id = this.nextAuditId;
    this.nextAuditId += 1;

    return { id, message };
  }
}

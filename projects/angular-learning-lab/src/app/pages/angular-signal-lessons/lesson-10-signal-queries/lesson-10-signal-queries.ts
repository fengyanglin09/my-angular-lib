import { Component, ElementRef, computed, signal, viewChild, viewChildren } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface LessonNote {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-lesson-10-signal-queries',
  imports: [LearningNav],
  templateUrl: './lesson-10-signal-queries.html',
  styleUrl: './lesson-10-signal-queries.css',
})
export class Lesson10SignalQueries {
  private nextId = 4;

  protected readonly searchInput =
    viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  protected readonly noteCards = viewChildren<unknown, ElementRef<HTMLElement>>(
    'noteCard',
    {
      read: ElementRef,
    },
  );

  protected readonly query = signal('');
  protected readonly notes = signal<LessonNote[]>([
    {
      id: 1,
      title: 'Focus search',
      body: 'viewChild can find a template reference and expose it as a signal.',
    },
    {
      id: 2,
      title: 'Count rendered cards',
      body: 'viewChildren updates when the rendered list changes.',
    },
    {
      id: 3,
      title: 'DOM work stays explicit',
      body: 'Use query signals for focus, scrolling, measuring, and child component APIs.',
    },
  ]);
  protected readonly logs = signal<string[]>([
    'Signal queries are ready after Angular renders the view.',
  ]);

  protected readonly filteredNotes = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.notes();
    }

    return this.notes().filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query),
    );
  });

  protected readonly renderedCardCount = computed(() => this.noteCards().length);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'viewChild creates a signal for one template reference or child component.',
      name: 'viewChild',
      syntax: `searchInput =
  viewChild.required<
    ElementRef<HTMLInputElement>
  >('searchInput')`,
    },
    {
      description: 'viewChildren creates a signal array for all matching rendered items.',
      name: 'viewChildren',
      syntax: `noteCards =
  viewChildren<
    unknown,
    ElementRef<HTMLElement>
  >('noteCard', { read: ElementRef })`,
    },
    {
      description: 'Read query signals by calling them, then use the native element intentionally.',
      name: 'DOM action',
      syntax: 'searchInput().nativeElement.focus()',
    },
    {
      description: 'Query signals update when Angular adds or removes matching elements.',
      name: 'derived value',
      syntax: 'computed(() => noteCards().length)',
    },
  ];

  protected updateQuery(value: string): void {
    this.query.set(value);
  }

  protected focusSearch(): void {
    this.searchInput().nativeElement.focus();
    this.addLog('Focused the search input through viewChild().');
  }

  protected addNote(): void {
    const id = this.nextId;
    this.nextId += 1;

    this.notes.update((notes) => [
      ...notes,
      {
        id,
        title: `Generated note ${id}`,
        body: 'Adding data changes the rendered list, and viewChildren updates after render.',
      },
    ]);
    this.addLog(`Added note ${id}. viewChildren will include it after render.`);
  }

  protected removeLastNote(): void {
    this.notes.update((notes) => notes.slice(0, -1));
    this.addLog('Removed the last note. viewChildren will shrink after render.');
  }

  protected focusFirstCard(): void {
    const firstCard = this.noteCards()[0];

    if (!firstCard) {
      this.addLog('No rendered card is available to focus.');
      return;
    }

    firstCard.nativeElement.focus();
    firstCard.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    this.addLog('Focused the first rendered card through viewChildren().');
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Try filtering, adding, or removing notes.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

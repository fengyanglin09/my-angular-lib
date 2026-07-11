import {
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

interface SavedView {
  id: number;
  name: string;
}

@Component({
  selector: 'app-view-queries-demo',
  templateUrl: './view-queries-demo.html',
  styleUrl: './view-queries-demo.css',
})
export class ViewQueriesDemo {
  private nextId = 3;

  protected readonly searchInput =
    viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  protected readonly savedViewCards = viewChildren<
    unknown,
    ElementRef<HTMLElement>
  >('savedViewCard', {
    read: ElementRef,
  });

  protected readonly savedViews = signal<SavedView[]>([
    { id: 1, name: 'Open lessons' },
    { id: 2, name: 'Needs review' },
  ]);
  protected readonly lastAction = signal(
    'viewChild can focus the search input because it is in this component template.'
  );
  protected readonly cardCount = computed(() => this.savedViewCards().length);

  protected focusSearch(): void {
    this.searchInput().nativeElement.focus();
    this.lastAction.set('Focused the input through viewChild.');
  }

  protected addSavedView(): void {
    const id = this.nextId;
    this.nextId += 1;

    this.savedViews.update((views) => [
      ...views,
      { id, name: `Saved view ${id}` },
    ]);
    this.lastAction.set(
      'Added a card. viewChildren will include it after Angular renders.'
    );

    window.setTimeout(() => this.scrollLastCard(), 0);
  }

  protected scrollLastCard(): void {
    const lastCard = this.savedViewCards().at(-1)?.nativeElement;

    lastCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    lastCard?.focus();
    this.lastAction.set('Focused the last card through viewChildren.');
  }
}

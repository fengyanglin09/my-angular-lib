import { Component, Pipe, PipeTransform, signal } from '@angular/core';

let pureTransformCount = 0;
let impureTransformCount = 0;

@Pipe({
  name: 'pureItemSummary',
})
export class PureItemSummaryPipe implements PipeTransform {
  transform(items: string[]): string {
    pureTransformCount += 1;
    return `${items.length} items. Pure transform #${pureTransformCount}.`;
  }
}

@Pipe({
  name: 'impureItemSummary',
  pure: false,
})
export class ImpureItemSummaryPipe implements PipeTransform {
  transform(items: string[]): string {
    impureTransformCount += 1;
    return `${items.length} items. Impure transform #${impureTransformCount}.`;
  }
}

@Component({
  selector: 'app-pure-impure-demo',
  imports: [ImpureItemSummaryPipe, PureItemSummaryPipe],
  templateUrl: './pure-impure-demo.html',
  styleUrl: './pure-impure-demo.css',
})
export class PureImpureDemo {
  protected items = ['Design review', 'API cleanup'];
  protected readonly renderTick = signal(0);
  protected readonly lastAction = signal('Start with two items.');

  protected mutateArray(): void {
    this.items.push(`Mutated item ${this.items.length + 1}`);
    this.renderTick.update((tick) => tick + 1);
    this.lastAction.set('Mutated the existing array reference.');
  }

  protected replaceArray(): void {
    this.items = [...this.items, `Replaced item ${this.items.length + 1}`];
    this.renderTick.update((tick) => tick + 1);
    this.lastAction.set('Replaced the array with a new reference.');
  }

  protected forceRender(): void {
    this.renderTick.update((tick) => tick + 1);
    this.lastAction.set('Forced another render without changing the array.');
  }
}

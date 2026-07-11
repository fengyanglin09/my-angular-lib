import { Component, computed, signal } from '@angular/core';

type DesignMode = 'drift' | 'shared';

@Component({
  selector: 'app-design-consistency-demo',
  templateUrl: './design-consistency-demo.html',
  styleUrl: './design-consistency-demo.css',
})
export class DesignConsistencyDemo {
  protected readonly mode = signal<DesignMode>('drift');
  protected readonly modeLabel = computed(() =>
    this.mode() === 'drift' ? 'CSS drift' : 'shared pattern'
  );

  protected showDrift(): void {
    this.mode.set('drift');
  }

  protected showSharedPattern(): void {
    this.mode.set('shared');
  }
}

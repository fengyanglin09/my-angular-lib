import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signals-change-detection-demo',
  templateUrl: './signals-change-detection-demo.html',
  styleUrl: './signals-change-detection-demo.css',
})
export class SignalsChangeDetectionDemo {
  protected readonly count = signal(1);
  protected readonly labelPrefix = signal('Current count');
  protected readonly unrelatedDraft = signal('edit me');
  private countLabelRuns = 0;
  protected readonly countLabel = computed(() => {
    this.countLabelRuns += 1;

    return `${this.labelPrefix()}: ${this.count()}`;
  });

  protected get computedRuns(): number {
    return this.countLabelRuns;
  }

  protected increment(): void {
    this.count.update((count) => count + 1);
  }

  protected changePrefix(): void {
    this.labelPrefix.update((prefix) =>
      prefix === 'Current count' ? 'Signal value' : 'Current count'
    );
  }

  protected updateUnrelatedDraft(): void {
    this.unrelatedDraft.update((draft) => `${draft}.`);
  }
}

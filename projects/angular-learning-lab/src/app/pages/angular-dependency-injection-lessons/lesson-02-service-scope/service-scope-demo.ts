import { Component, inject, Injectable, signal } from '@angular/core';

type ScopeMode = 'shared' | 'isolated';

@Injectable()
class ScopeCounterService {
  readonly instanceId = Math.floor(Math.random() * 9000) + 1000;
  readonly count = signal(0);

  increment(): void {
    this.count.update((count) => count + 1);
  }
}

@Component({
  selector: 'app-scope-counter-panel-demo',
  template: `
    <article class="counter-card">
      <p class="eyebrow">{{ label }}</p>
      <h3>Service instance #{{ counter.instanceId }}</h3>
      <p>Count: {{ counter.count() }}</p>
      <button type="button" (click)="counter.increment()">Increment</button>
    </article>
  `,
})
class ScopeCounterPanelDemo {
  readonly counter = inject(ScopeCounterService);
  label = 'Panel';
}

@Component({
  selector: 'app-shared-scope-demo',
  providers: [ScopeCounterService],
  imports: [ScopeCounterPanelDemo],
  template: `
    <div class="demo-grid">
      <app-scope-counter-panel-demo />
      <app-scope-counter-panel-demo />
    </div>
  `,
})
class SharedScopeDemo {}

@Component({
  selector: 'app-isolated-scope-panel-demo',
  providers: [ScopeCounterService],
  template: `
    <article class="counter-card">
      <p class="eyebrow">Isolated panel</p>
      <h3>Service instance #{{ counter.instanceId }}</h3>
      <p>Count: {{ counter.count() }}</p>
      <button type="button" (click)="counter.increment()">Increment</button>
    </article>
  `,
})
class IsolatedScopePanelDemo {
  protected readonly counter = inject(ScopeCounterService);
}

@Component({
  selector: 'app-isolated-scope-demo',
  imports: [IsolatedScopePanelDemo],
  template: `
    <div class="demo-grid">
      <app-isolated-scope-panel-demo />
      <app-isolated-scope-panel-demo />
    </div>
  `,
})
class IsolatedScopeDemo {}

@Component({
  selector: 'app-service-scope-demo',
  imports: [IsolatedScopeDemo, SharedScopeDemo],
  templateUrl: './service-scope-demo.html',
  styleUrl: './service-scope-demo.css',
})
export class ServiceScopeDemo {
  protected readonly mode = signal<ScopeMode>('shared');

  protected showShared(): void {
    this.mode.set('shared');
  }

  protected showIsolated(): void {
    this.mode.set('isolated');
  }
}

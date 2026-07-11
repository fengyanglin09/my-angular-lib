import { Component, inject, Injectable, signal } from '@angular/core';

type StateMode = 'shared' | 'isolated';
type DemoTab = 'overview' | 'activity' | 'settings';

@Injectable()
class DemoTabStateService {
  readonly instanceId = Math.floor(Math.random() * 9000) + 1000;
  readonly activeTab = signal<DemoTab>('overview');

  selectTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }
}

@Component({
  selector: 'app-tab-widget-demo',
  template: `
    <article class="tab-widget">
      <p class="eyebrow">{{ label }}</p>
      <h3>State service #{{ tabState.instanceId }}</h3>
      <div class="tab-row">
        <button type="button" (click)="tabState.selectTab('overview')">
          Overview
        </button>
        <button type="button" (click)="tabState.selectTab('activity')">
          Activity
        </button>
        <button type="button" (click)="tabState.selectTab('settings')">
          Settings
        </button>
      </div>
      <p>Active tab: {{ tabState.activeTab() }}</p>
    </article>
  `,
})
class TabWidgetDemo {
  readonly tabState = inject(DemoTabStateService);
  label = 'Tab widget';
}

@Component({
  selector: 'app-shared-tab-state-demo',
  providers: [DemoTabStateService],
  imports: [TabWidgetDemo],
  template: `
    <div class="demo-grid">
      <app-tab-widget-demo />
      <app-tab-widget-demo />
    </div>
  `,
})
class SharedTabStateDemo {}

@Component({
  selector: 'app-isolated-tab-widget-demo',
  providers: [DemoTabStateService],
  imports: [TabWidgetDemo],
  template: `<app-tab-widget-demo />`,
})
class IsolatedTabWidgetDemo {}

@Component({
  selector: 'app-isolated-tab-state-demo',
  imports: [IsolatedTabWidgetDemo],
  template: `
    <div class="demo-grid">
      <app-isolated-tab-widget-demo />
      <app-isolated-tab-widget-demo />
    </div>
  `,
})
class IsolatedTabStateDemo {}

@Component({
  selector: 'app-shared-vs-isolated-state-demo',
  imports: [IsolatedTabStateDemo, SharedTabStateDemo],
  templateUrl: './shared-vs-isolated-state-demo.html',
  styleUrl: './shared-vs-isolated-state-demo.css',
})
export class SharedVsIsolatedStateDemo {
  protected readonly mode = signal<StateMode>('shared');

  protected showShared(): void {
    this.mode.set('shared');
  }

  protected showIsolated(): void {
    this.mode.set('isolated');
  }
}

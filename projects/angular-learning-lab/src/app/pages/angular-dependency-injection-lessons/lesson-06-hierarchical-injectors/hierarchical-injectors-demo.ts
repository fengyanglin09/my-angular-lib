import { Component, inject, InjectionToken, signal } from '@angular/core';

const DEMO_THEME_NAME = new InjectionToken<string>('DEMO_THEME_NAME');

@Component({
  selector: 'app-theme-consumer-demo',
  template: `
    <article class="theme-card">
      <p class="eyebrow">Child consumer</p>
      <h3>Injected theme: {{ theme }}</h3>
      <p>The child receives the nearest provider value in its injector path.</p>
    </article>
  `,
})
class ThemeConsumerDemo {
  protected readonly theme = inject(DEMO_THEME_NAME);
}

@Component({
  selector: 'app-default-theme-branch-demo',
  imports: [ThemeConsumerDemo],
  template: `<app-theme-consumer-demo />`,
})
class DefaultThemeBranchDemo {}

@Component({
  selector: 'app-admin-theme-branch-demo',
  providers: [{ provide: DEMO_THEME_NAME, useValue: 'dark admin theme' }],
  imports: [ThemeConsumerDemo],
  template: `<app-theme-consumer-demo />`,
})
class AdminThemeBranchDemo {}

@Component({
  selector: 'app-hierarchical-injectors-demo',
  providers: [{ provide: DEMO_THEME_NAME, useValue: 'light root theme' }],
  imports: [AdminThemeBranchDemo, DefaultThemeBranchDemo],
  templateUrl: './hierarchical-injectors-demo.html',
  styleUrl: './hierarchical-injectors-demo.css',
})
export class HierarchicalInjectorsDemo {
  protected readonly useOverride = signal(false);

  protected toggleOverride(): void {
    this.useOverride.update((value) => !value);
  }
}

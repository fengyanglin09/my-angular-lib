import { Component, signal } from '@angular/core';

type RouteChunkState = 'not-loaded' | 'loading' | 'loaded';

@Component({
  selector: 'app-lazy-loading-demo',
  templateUrl: './lazy-loading-demo.html',
  styleUrl: './lazy-loading-demo.css',
})
export class LazyLoadingDemo {
  protected readonly reportsState = signal<RouteChunkState>('not-loaded');
  protected readonly settingsState = signal<RouteChunkState>('not-loaded');
  protected readonly activeRoute = signal('dashboard');

  protected visitDashboard(): void {
    this.activeRoute.set('dashboard');
  }

  protected visitReports(): void {
    this.activeRoute.set('reports');
    this.loadChunk(this.reportsState);
  }

  protected visitSettings(): void {
    this.activeRoute.set('settings');
    this.loadChunk(this.settingsState);
  }

  private loadChunk(state: {
    (): RouteChunkState;
    set(value: RouteChunkState): void;
  }): void {
    if (state() === 'loaded') {
      return;
    }

    state.set('loading');
    window.setTimeout(() => state.set('loaded'), 650);
  }
}

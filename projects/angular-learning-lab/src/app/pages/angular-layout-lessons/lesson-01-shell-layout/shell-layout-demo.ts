import { Component, computed, signal } from '@angular/core';

type ShellPage = 'dashboard' | 'projects' | 'settings';

@Component({
  selector: 'app-shell-layout-demo',
  templateUrl: './shell-layout-demo.html',
  styleUrl: './shell-layout-demo.css',
})
export class ShellLayoutDemo {
  protected readonly activePage = signal<ShellPage>('dashboard');
  protected readonly navigationCount = signal(0);
  protected readonly pageTitle = computed(() => {
    const page = this.activePage();

    if (page === 'dashboard') {
      return 'Workspace dashboard';
    }

    if (page === 'projects') {
      return 'Project list';
    }

    return 'Workspace settings';
  });

  protected navigate(page: ShellPage): void {
    this.activePage.set(page);
    this.navigationCount.update((count) => count + 1);
  }
}

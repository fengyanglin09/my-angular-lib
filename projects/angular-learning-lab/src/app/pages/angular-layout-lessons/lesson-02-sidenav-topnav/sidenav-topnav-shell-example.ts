import { Component, computed, signal } from '@angular/core';

import { LayoutSidenavExample } from './layout-sidenav-example';
import { LayoutTopnavExample } from './layout-topnav-example';

@Component({
  selector: 'app-sidenav-topnav-shell-example',
  imports: [LayoutSidenavExample, LayoutTopnavExample],
  templateUrl: './sidenav-topnav-shell-example.html',
  styleUrl: './sidenav-topnav-shell-example.css',
})
export class SidenavTopnavShellExample {
  protected readonly activeSection = signal('workspace-overview');
  protected readonly compact = signal(false);
  protected readonly menuToggleCount = signal(0);

  protected readonly activeSectionTitle = computed(() => {
    const section = this.activeSection().replaceAll('-', ' ');

    return section[0].toUpperCase() + section.slice(1);
  });

  protected selectSection(section: string): void {
    this.activeSection.set(section);
  }

  protected toggleSidenav(): void {
    this.compact.update((compact) => !compact);
    this.menuToggleCount.update((count) => count + 1);
  }
}

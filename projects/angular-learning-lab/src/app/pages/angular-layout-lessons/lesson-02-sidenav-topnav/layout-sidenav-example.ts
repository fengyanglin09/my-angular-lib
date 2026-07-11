import { Component, input, output, signal } from '@angular/core';

interface NavGroup {
  badge?: string;
  id: string;
  items: NavItem[];
  label: string;
}

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-layout-sidenav-example',
  templateUrl: './layout-sidenav-example.html',
  styleUrl: './layout-sidenav-example.css',
})
export class LayoutSidenavExample {
  readonly activeSection = input('workspace-overview');
  readonly compact = input(false);
  readonly sectionSelected = output<string>();

  protected readonly expandedGroups = signal(
    new Set(['workspace', 'insights'])
  );

  protected readonly groups: NavGroup[] = [
    {
      id: 'workspace',
      label: 'Workspace',
      items: [
        { id: 'workspace-overview', label: 'Overview' },
        { id: 'workspace-activity', label: 'Activity' },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      badge: '8',
      items: [
        { id: 'projects-active', label: 'Active Projects' },
        { id: 'projects-archive', label: 'Archive' },
      ],
    },
    {
      id: 'insights',
      label: 'Insights',
      items: [
        { id: 'insights-reports', label: 'Reports' },
        { id: 'insights-metrics', label: 'Metrics' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      items: [
        { id: 'settings-profile', label: 'Profile' },
        { id: 'settings-permissions', label: 'Permissions' },
      ],
    },
  ];

  protected isExpanded(groupId: string): boolean {
    return this.expandedGroups().has(groupId);
  }

  protected isGroupActive(group: NavGroup): boolean {
    return group.items.some((item) => item.id === this.activeSection());
  }

  protected selectItem(itemId: string): void {
    this.sectionSelected.emit(itemId);
  }

  protected toggleGroup(group: NavGroup): void {
    this.expandedGroups.update((expandedGroups) => {
      const nextExpandedGroups = new Set(expandedGroups);

      if (nextExpandedGroups.has(group.id) && this.isGroupActive(group)) {
        nextExpandedGroups.delete(group.id);
      } else {
        nextExpandedGroups.add(group.id);
      }

      return nextExpandedGroups;
    });

    if (!this.isGroupActive(group)) {
      this.sectionSelected.emit(group.items[0].id);
    }
  }
}

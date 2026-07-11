import { Component, computed, signal } from '@angular/core';

type DemoRole = 'viewer' | 'manager' | 'admin';

@Component({
  selector: 'app-role-based-ui-demo',
  templateUrl: './role-based-ui-demo.html',
  styleUrl: './role-based-ui-demo.css',
})
export class RoleBasedUiDemo {
  protected readonly role = signal<DemoRole>('viewer');
  protected readonly canApprove = computed(() =>
    ['manager', 'admin'].includes(this.role())
  );
  protected readonly canDelete = computed(() => this.role() === 'admin');
  protected readonly log = signal(
    'Viewer can inspect the page but cannot approve or delete.'
  );

  protected setRole(role: DemoRole): void {
    this.role.set(role);
    this.log.set(`Role changed to ${role}. UI affordances updated.`);
  }
}

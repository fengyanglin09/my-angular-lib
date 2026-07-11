import { Component, computed, signal } from '@angular/core';

type DemoRole = 'anonymous' | 'viewer' | 'admin';

@Component({
  selector: 'app-route-guards-demo',
  templateUrl: './route-guards-demo.html',
  styleUrl: './route-guards-demo.css',
})
export class RouteGuardsDemo {
  protected readonly role = signal<DemoRole>('anonymous');
  protected readonly requestedRoute = signal('/admin/reports');
  protected readonly guardResult = computed(() => {
    if (this.role() === 'anonymous') {
      return {
        decision: 'UrlTree redirect',
        destination: '/login?returnUrl=/admin/reports',
        reason: 'No session exists.',
      };
    }

    if (this.role() !== 'admin') {
      return {
        decision: 'UrlTree redirect',
        destination: '/access-denied',
        reason: 'User is logged in but does not have admin role.',
      };
    }

    return {
      decision: 'true',
      destination: this.requestedRoute(),
      reason: 'User has the required admin role.',
    };
  });

  protected setRole(role: DemoRole): void {
    this.role.set(role);
  }
}

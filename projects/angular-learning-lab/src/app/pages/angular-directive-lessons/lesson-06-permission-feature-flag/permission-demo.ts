import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';

type UserRole = 'admin' | 'manager' | 'viewer';

interface AccessRule {
  featureEnabled: boolean;
  requiredRole: UserRole;
  userRole: UserRole;
}

const roleRank: Record<UserRole, number> = {
  admin: 3,
  manager: 2,
  viewer: 1,
};

@Directive({
  selector: '[appCanAccess]',
})
export class CanAccessDirective {
  private hasView = false;
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  @Input()
  set appCanAccess(rule: AccessRule) {
    const canAccess =
      rule.featureEnabled &&
      roleRank[rule.userRole] >= roleRank[rule.requiredRole];

    if (canAccess && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      return;
    }

    if (!canAccess && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

@Component({
  selector: 'app-permission-demo',
  imports: [CanAccessDirective],
  templateUrl: './permission-demo.html',
  styleUrl: './permission-demo.css',
})
export class PermissionDemo {
  protected readonly role = signal<UserRole>('viewer');
  protected readonly featureEnabled = signal(true);
  protected readonly roles: UserRole[] = ['viewer', 'manager', 'admin'];

  protected setRole(role: UserRole): void {
    this.role.set(role);
  }

  protected toggleFeature(): void {
    this.featureEnabled.update((enabled) => !enabled);
  }
}

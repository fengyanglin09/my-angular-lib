import { Injectable, signal } from '@angular/core';

type WorkspaceName = 'Design System' | 'Customer Portal' | 'Billing Tools';

@Injectable()
export class RouteProvidersWorkspaceStore {
  private static nextInstanceId = 1;

  readonly instanceId: number;
  readonly createdAt = new Date().toLocaleTimeString();
  readonly workspace = signal<WorkspaceName>('Customer Portal');
  readonly draftCount = signal(0);
  readonly routeLog = signal<string[]>([]);

  constructor() {
    this.instanceId = RouteProvidersWorkspaceStore.nextInstanceId;
    RouteProvidersWorkspaceStore.nextInstanceId += 1;
    this.routeLog.set([`Route-scoped store #${this.instanceId} was created.`]);
  }

  addDraft(source: string): void {
    this.draftCount.update((count) => count + 1);
    this.addLog(`${source} added a draft to store #${this.instanceId}.`);
  }

  clearDrafts(): void {
    this.draftCount.set(0);
    this.addLog(`Drafts were cleared in store #${this.instanceId}.`);
  }

  switchWorkspace(workspace: WorkspaceName): void {
    this.workspace.set(workspace);
    this.addLog(`Workspace changed to ${workspace} in store #${this.instanceId}.`);
  }

  private addLog(message: string): void {
    this.routeLog.update((logs) => [...logs, message]);
  }
}

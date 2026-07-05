import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface SupportTicketSnapshot {
  loadedAt: string;
  refreshId: string;
  runId: number;
  status: string;
  ticketId: string;
  title: string;
}

const ticketStatuses: Record<string, string> = {
  'ticket-101': 'Waiting on customer',
  'ticket-202': 'Backend investigation',
  'ticket-303': 'Ready for release',
};

@Injectable({ providedIn: 'root' })
export class ProgrammaticResolverLogService {
  private nextRunId = 1;

  readonly resolverLog = signal<string[]>([
    'Resolver log ready. Use Refresh resolver data to trigger navigation with a new refreshId.',
  ]);

  resolveTicket(route: ActivatedRouteSnapshot): SupportTicketSnapshot {
    const ticketId = route.paramMap.get('ticketId') ?? 'ticket-101';
    const refreshId = route.queryParamMap.get('refreshId') ?? 'initial-load';
    const runId = this.nextRunId;

    this.nextRunId += 1;
    this.resolverLog.update((logs) => [
      ...logs,
      `Resolver run #${runId}: ticketId="${ticketId}", refreshId="${refreshId}".`,
    ]);

    return {
      loadedAt: new Date().toLocaleTimeString(),
      refreshId,
      runId,
      status: ticketStatuses[ticketId] ?? 'Unknown ticket',
      ticketId,
      title: this.formatTicketTitle(ticketId),
    };
  }

  clearLog(): void {
    this.resolverLog.set(['Log cleared. Refresh or navigate to run the resolver again.']);
  }

  private formatTicketTitle(ticketId: string): string {
    return ticketId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}

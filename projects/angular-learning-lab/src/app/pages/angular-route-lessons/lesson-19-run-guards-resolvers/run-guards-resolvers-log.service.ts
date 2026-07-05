import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface ReportSnapshot {
  reportId: string;
  resolvedAt: string;
  resolvedTab: string;
  runId: number;
  strategy: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class RunGuardsResolversLogService {
  private nextRunId = 1;

  readonly resolverLog = signal<string[]>([
    'Resolver log ready. Change report id or query tab to compare rerun behavior.',
  ]);

  resolveReport(route: ActivatedRouteSnapshot): ReportSnapshot {
    const reportId = route.paramMap.get('reportId') ?? 'unknown-report';
    const tab = route.queryParamMap.get('tab') ?? 'summary';
    const strategy = route.data['strategyLabel'] as string;
    const runId = this.nextRunId;

    this.nextRunId += 1;
    this.resolverLog.update((logs) => [
      ...logs,
      `Resolver run #${runId}: ${strategy}, reportId="${reportId}", tab="${tab}".`,
    ]);

    return {
      reportId,
      resolvedAt: new Date().toLocaleTimeString(),
      resolvedTab: tab,
      runId,
      strategy,
      title: this.formatTitle(reportId),
    };
  }

  clearLog(): void {
    this.resolverLog.set(['Log cleared. Navigate again to see resolver runs.']);
  }

  private formatTitle(reportId: string): string {
    return reportId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}

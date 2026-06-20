import { Component, computed, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { HeavyReportPanel } from './heavy-report-panel';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface ReportRow {
  label: string;
  value: number;
}

@Component({
  selector: 'app-lesson-13-defer-blocks',
  imports: [HeavyReportPanel, LearningNav],
  templateUrl: './lesson-13-defer-blocks.html',
  styleUrl: './lesson-13-defer-blocks.css',
})
export class Lesson13DeferBlocks {
  protected readonly showReport = signal(false);
  protected readonly reportVersion = signal(1);
  protected readonly logs = signal<string[]>([
    'The heavy report is not rendered until the defer trigger becomes true.',
  ]);

  protected readonly rows = computed<ReportRow[]>(() => [
    { label: 'North', value: 120 + this.reportVersion() * 4 },
    { label: 'South', value: 86 + this.reportVersion() * 6 },
    { label: 'West', value: 64 + this.reportVersion() * 5 },
    { label: 'East', value: 92 + this.reportVersion() * 3 },
  ]);

  protected readonly reportStatus = computed(() =>
    this.showReport() ? 'Report requested' : 'Report deferred',
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The defer block delays loading and rendering until its trigger is true.',
      name: '@defer',
      syntax: `@defer (when showReport()) {
  <app-heavy-report-panel />
}`,
    },
    {
      description: 'A placeholder is visible before the deferred content starts loading.',
      name: '@placeholder',
      syntax: `@placeholder {
  <p>Select Load Report</p>
}`,
    },
    {
      description: 'A loading block can show progress while the deferred dependency loads.',
      name: '@loading',
      syntax: `@loading (minimum 500ms) {
  <p>Loading report...</p>
}`,
    },
    {
      description: 'Use defer for expensive UI, not for normal if/else display logic.',
      name: 'when to use',
      syntax: `large chart
rich editor
map widget
admin-only panel`,
    },
  ];

  protected loadReport(): void {
    this.showReport.set(true);
    this.addLog('@defer trigger changed to true. Deferred report can render.');
  }

  protected refreshReport(): void {
    this.reportVersion.update((version) => version + 1);
    this.addLog('Report input changed. The already-loaded deferred component updates normally.');
  }

  protected resetDemo(): void {
    this.showReport.set(false);
    this.reportVersion.set(1);
    this.logs.set(['Demo reset. The report block is deferred again.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

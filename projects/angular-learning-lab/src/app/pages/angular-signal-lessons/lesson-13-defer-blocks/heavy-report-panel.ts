import { Component, computed, input } from '@angular/core';

interface ReportRow {
  label: string;
  value: number;
}

@Component({
  selector: 'app-heavy-report-panel',
  templateUrl: './heavy-report-panel.html',
  styleUrl: './heavy-report-panel.css',
})
export class HeavyReportPanel {
  readonly reportName = input('Revenue Report');
  readonly rows = input<ReportRow[]>([]);

  protected readonly total = computed(() =>
    this.rows().reduce((sum, row) => sum + row.value, 0),
  );
}

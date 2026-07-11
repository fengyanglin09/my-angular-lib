import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-heavy-chart-demo',
  template: `
    <article class="chart-card">
      <p class="eyebrow">Deferred widget</p>
      <h3>Analytics Chart</h3>
      <div class="bars" aria-hidden="true">
        <span style="height: 42%"></span>
        <span style="height: 76%"></span>
        <span style="height: 58%"></span>
        <span style="height: 88%"></span>
      </div>
    </article>
  `,
})
export class HeavyChartDemo {}

@Component({
  selector: 'app-defer-blocks-demo',
  imports: [HeavyChartDemo],
  templateUrl: './defer-blocks-demo.html',
  styleUrl: './defer-blocks-demo.css',
})
export class DeferBlocksDemo {
  protected readonly showChart = signal(false);

  protected revealChart(): void {
    this.showChart.set(true);
  }

  protected reset(): void {
    this.showChart.set(false);
  }
}

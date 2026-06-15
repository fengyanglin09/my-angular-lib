import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface MetricCard {
  id: number;
  label: string;
  value: number;
}

interface RenderMeasurement {
  cardCount: number;
  firstCardHeight: number;
  totalCardWidth: number;
}

@Component({
  selector: 'app-lesson-12-after-render',
  imports: [LearningNav],
  templateUrl: './lesson-12-after-render.html',
  styleUrl: './lesson-12-after-render.css',
})
export class Lesson12AfterRender {
  private readonly injector = inject(Injector);
  private nextId = 4;

  protected readonly metricCards =
    viewChildren<ElementRef<HTMLElement>>('metricCard');

  protected readonly compact = signal(false);
  protected readonly metrics = signal<MetricCard[]>([
    { id: 1, label: 'Revenue', value: 128 },
    { id: 2, label: 'Subscriptions', value: 64 },
    { id: 3, label: 'Tickets', value: 18 },
  ]);
  protected readonly measurement = signal<RenderMeasurement>({
    cardCount: 0,
    firstCardHeight: 0,
    totalCardWidth: 0,
  });
  protected readonly logs = signal<string[]>([
    'afterRenderEffect waits until Angular renders, then reads card sizes.',
  ]);

  protected readonly totalValue = computed(() =>
    this.metrics().reduce((total, metric) => total + metric.value, 0),
  );
  protected readonly layoutMode = computed(() =>
    this.compact() ? 'compact cards' : 'comfortable cards',
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Use afterNextRender for one-time DOM work after the next render finishes.',
      name: 'afterNextRender',
      syntax: `afterNextRender({
  write: () => lastCard.scrollIntoView(),
  read: () => measureCard()
})`,
    },
    {
      description: 'Use afterRenderEffect when signal changes should trigger DOM work after render.',
      name: 'afterRenderEffect',
      syntax: `afterRenderEffect({
  read: () => {
    metrics();
    metricCards();
    measureRenderedCards();
  }
})`,
    },
    {
      description: 'Split DOM writes and reads into phases when possible.',
      name: 'phases',
      syntax: `write()
  change DOM

read()
  measure DOM`,
    },
    {
      description: 'Avoid updating signals in afterEveryRender unless you are very sure it will not loop.',
      name: 'safety',
      syntax: `afterEveryRender(...)
// runs after every render
// easy to overuse`,
    },
  ];

  constructor() {
    afterRenderEffect({
      read: () => {
        this.metrics();
        this.compact();

        const cards = this.metricCards().map((card) => card.nativeElement);
        const firstCard = cards[0];
        const measurement: RenderMeasurement = {
          cardCount: cards.length,
          firstCardHeight: Math.round(firstCard?.getBoundingClientRect().height ?? 0),
          totalCardWidth: Math.round(
            cards.reduce(
              (total, card) => total + card.getBoundingClientRect().width,
              0,
            ),
          ),
        };

        this.measurement.set(measurement);
      },
    });
  }

  protected addMetric(): void {
    const id = this.nextId;
    this.nextId += 1;

    this.metrics.update((metrics) => [
      ...metrics,
      {
        id,
        label: `Metric ${id}`,
        value: 20 + id * 7,
      },
    ]);

    afterNextRender(
      {
        write: () => {
          const lastCard = this.metricCards().at(-1)?.nativeElement;
          lastCard?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          lastCard?.focus();

          return lastCard?.dataset['metricLabel'] ?? 'new metric';
        },
        read: (metricLabel) => {
          this.addLog(`afterNextRender focused ${metricLabel}.`);
        },
      },
      { injector: this.injector },
    );
  }

  protected toggleDensity(): void {
    this.compact.update((compact) => !compact);
    this.addLog(`Density changed to ${this.layoutMode()}. Measurement runs after render.`);
  }

  protected removeLastMetric(): void {
    this.metrics.update((metrics) => metrics.slice(0, -1));
    this.addLog('Removed the last card. Measurement runs after render.');
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Change cards to see render timing.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}

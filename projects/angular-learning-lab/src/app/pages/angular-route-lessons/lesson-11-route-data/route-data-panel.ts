import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { RoutePageMeta } from './route-data.models';

const fallbackMeta: RoutePageMeta = {
  badge: 'No route data',
  breadcrumb: 'Unknown',
  featureArea: 'Unknown',
  helpText: 'This fallback appears if the route did not provide metadata.',
  pageLabel: 'Missing route data',
  requiredRole: 'None',
};

@Component({
  selector: 'app-route-data-panel',
  template: `
    <article class="route-data-panel">
      <div>
        <p class="eyebrow">{{ meta().badge }}</p>
        <h3>{{ meta().pageLabel }}</h3>
        <p>{{ meta().helpText }}</p>
      </div>

      <dl>
        <div>
          <dt>featureArea</dt>
          <dd>{{ meta().featureArea }}</dd>
        </div>
        <div>
          <dt>breadcrumb</dt>
          <dd>{{ meta().breadcrumb }}</dd>
        </div>
        <div>
          <dt>requiredRole</dt>
          <dd>{{ meta().requiredRole }}</dd>
        </div>
        <div>
          <dt>route title</dt>
          <dd>{{ routeTitle() }}</dd>
        </div>
      </dl>
    </article>
  `,
  styles: [
    `
      .route-data-panel {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 16px;
        padding: 18px;
      }

      h3,
      p {
        margin: 0;
      }

      p,
      dd {
        color: #606b78;
      }
    `,
  ],
})
export class RouteDataPanel {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly meta = signal<RoutePageMeta>(fallbackMeta);
  protected readonly routeTitle = signal('No title provided');

  constructor() {
    this.route.data
      .pipe(
        map((data) => data['page'] as RoutePageMeta | undefined),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((page) => {
        this.meta.set(page ?? fallbackMeta);
      });

    this.route.title.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((title) => {
      this.routeTitle.set(title ?? 'No title provided');
    });
  }
}

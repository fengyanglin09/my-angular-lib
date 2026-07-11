import { Component, inject, InjectionToken, signal } from '@angular/core';

const DEMO_API_BASE_URL = new InjectionToken<string>('DEMO_API_BASE_URL');

@Component({
  selector: 'app-api-endpoint-preview-demo',
  template: `
    <article class="endpoint-card">
      <p class="eyebrow">Injected token value</p>
      <h3>{{ apiBaseUrl }}</h3>
      <p>Courses endpoint: {{ apiBaseUrl }}/courses</p>
    </article>
  `,
})
class ApiEndpointPreviewDemo {
  protected readonly apiBaseUrl = inject(DEMO_API_BASE_URL);
}

@Component({
  selector: 'app-local-api-token-demo',
  providers: [
    { provide: DEMO_API_BASE_URL, useValue: 'http://localhost:3000' },
  ],
  imports: [ApiEndpointPreviewDemo],
  template: `<app-api-endpoint-preview-demo />`,
})
class LocalApiTokenDemo {}

@Component({
  selector: 'app-prod-api-token-demo',
  providers: [
    { provide: DEMO_API_BASE_URL, useValue: 'https://api.example.com' },
  ],
  imports: [ApiEndpointPreviewDemo],
  template: `<app-api-endpoint-preview-demo />`,
})
class ProdApiTokenDemo {}

@Component({
  selector: 'app-injection-tokens-demo',
  imports: [LocalApiTokenDemo, ProdApiTokenDemo],
  templateUrl: './injection-tokens-demo.html',
  styleUrl: './injection-tokens-demo.css',
})
export class InjectionTokensDemo {
  protected readonly environment = signal<'local' | 'production'>('local');

  protected useLocal(): void {
    this.environment.set('local');
  }

  protected useProduction(): void {
    this.environment.set('production');
  }
}

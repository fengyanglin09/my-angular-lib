import { Component, inject, InjectionToken, signal } from '@angular/core';

interface DemoEnvironment {
  name: 'development' | 'production';
}

interface DemoLoggerConfig {
  level: 'debug' | 'warn';
  sendToServer: boolean;
}

const DEMO_ENVIRONMENT = new InjectionToken<DemoEnvironment>(
  'DEMO_ENVIRONMENT'
);
const DEMO_LOGGER_CONFIG = new InjectionToken<DemoLoggerConfig>(
  'DEMO_LOGGER_CONFIG'
);

function createLoggerConfig(): DemoLoggerConfig {
  const environment = inject(DEMO_ENVIRONMENT);

  return environment.name === 'development'
    ? { level: 'debug', sendToServer: false }
    : { level: 'warn', sendToServer: true };
}

@Component({
  selector: 'app-logger-config-preview-demo',
  template: `
    <article class="config-card">
      <p class="eyebrow">Factory result</p>
      <h3>{{ environment.name }}</h3>
      <dl>
        <div>
          <dt>level</dt>
          <dd>{{ config.level }}</dd>
        </div>
        <div>
          <dt>sendToServer</dt>
          <dd>{{ config.sendToServer }}</dd>
        </div>
      </dl>
    </article>
  `,
})
class LoggerConfigPreviewDemo {
  protected readonly environment = inject(DEMO_ENVIRONMENT);
  protected readonly config = inject(DEMO_LOGGER_CONFIG);
}

@Component({
  selector: 'app-development-factory-demo',
  providers: [
    { provide: DEMO_ENVIRONMENT, useValue: { name: 'development' } },
    { provide: DEMO_LOGGER_CONFIG, useFactory: createLoggerConfig },
  ],
  imports: [LoggerConfigPreviewDemo],
  template: `<app-logger-config-preview-demo />`,
})
class DevelopmentFactoryDemo {}

@Component({
  selector: 'app-production-factory-demo',
  providers: [
    { provide: DEMO_ENVIRONMENT, useValue: { name: 'production' } },
    { provide: DEMO_LOGGER_CONFIG, useFactory: createLoggerConfig },
  ],
  imports: [LoggerConfigPreviewDemo],
  template: `<app-logger-config-preview-demo />`,
})
class ProductionFactoryDemo {}

@Component({
  selector: 'app-factory-providers-demo',
  imports: [DevelopmentFactoryDemo, ProductionFactoryDemo],
  templateUrl: './factory-providers-demo.html',
  styleUrl: './factory-providers-demo.css',
})
export class FactoryProvidersDemo {
  protected readonly environment = signal<'development' | 'production'>(
    'development'
  );

  protected useDevelopment(): void {
    this.environment.set('development');
  }

  protected useProduction(): void {
    this.environment.set('production');
  }
}

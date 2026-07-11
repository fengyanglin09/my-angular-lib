import { Component, inject, Injectable, signal } from '@angular/core';

@Injectable()
class DemoLoggerService {
  private readonly instanceId = Math.floor(Math.random() * 9000) + 1000;

  describeLookup(): string {
    return `Angular returned DemoLoggerService instance #${this.instanceId}.`;
  }
}

@Component({
  selector: 'app-provider-basics-demo',
  providers: [DemoLoggerService],
  templateUrl: './provider-basics-demo.html',
  styleUrl: './provider-basics-demo.css',
})
export class ProviderBasicsDemo {
  private readonly logger = inject(DemoLoggerService);

  protected readonly lookupCount = signal(0);
  protected readonly lookupLog = signal(
    'Click lookup to ask the component injector for DemoLoggerService.'
  );

  protected runLookup(): void {
    this.lookupCount.update((count) => count + 1);
    this.lookupLog.set(this.logger.describeLookup());
  }
}

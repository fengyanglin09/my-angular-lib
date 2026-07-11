import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  private hasView = false;
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  @Input()
  set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      return;
    }

    if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

@Component({
  selector: 'app-unless-demo',
  imports: [UnlessDirective],
  templateUrl: './unless-demo.html',
  styleUrl: './unless-demo.css',
})
export class UnlessDemo {
  protected readonly showArchived = signal(false);

  protected toggleArchived(): void {
    this.showArchived.update((show) => !show);
  }
}

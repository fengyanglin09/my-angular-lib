import { DOCUMENT } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appDemoTooltip]',
})
export class DemoTooltipDirective {
  readonly appDemoTooltip = input('Helpful detail');

  @HostBinding('class.has-tooltip') protected readonly hasTooltip = true;
  @HostBinding('attr.data-tooltip') protected get tooltipText(): string {
    return this.appDemoTooltip();
  }
}

@Directive({
  selector: '[appDemoAutofocus]',
})
export class DemoAutofocusDirective {
  readonly appDemoAutofocus = input(0);

  private readonly element = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      this.appDemoAutofocus();
      window.setTimeout(() => this.element.nativeElement.focus(), 0);
    });
  }
}

@Directive({
  selector: '[appDemoClickOutside]',
})
export class DemoClickOutsideDirective {
  @Output() readonly appDemoClickOutside = new EventEmitter<void>();

  private readonly document = inject(DOCUMENT);
  private readonly element = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event.target'])
  protected onDocumentClick(target: EventTarget | null): void {
    if (!target || this.element.nativeElement.contains(target as Node)) {
      return;
    }

    if (this.document.contains(target as Node)) {
      this.appDemoClickOutside.emit();
    }
  }
}

@Component({
  selector: 'app-dom-behavior-demo',
  imports: [
    DemoAutofocusDirective,
    DemoClickOutsideDirective,
    DemoTooltipDirective,
  ],
  templateUrl: './dom-behavior-demo.html',
  styleUrl: './dom-behavior-demo.css',
})
export class DomBehaviorDemo {
  protected readonly focusCycle = signal(0);
  protected readonly panelOpen = signal(false);
  protected readonly log = signal(
    'Open the panel, focus the input, or hover the tooltip button.'
  );

  protected focusSearch(): void {
    this.focusCycle.update((cycle) => cycle + 1);
    this.log.set('Autofocus directive focused the search input.');
  }

  protected openPanel(): void {
    this.panelOpen.set(true);
    this.log.set('Panel opened. Click outside it to close.');
  }

  protected closePanel(): void {
    this.panelOpen.set(false);
    this.log.set('Click-outside directive closed the panel.');
  }
}

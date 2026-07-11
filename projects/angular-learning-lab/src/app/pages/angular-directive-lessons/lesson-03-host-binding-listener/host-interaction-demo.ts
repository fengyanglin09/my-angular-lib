import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appHostInteraction]',
})
export class HostInteractionDirective {
  @Output() readonly appHostInteractionTriggered = new EventEmitter<string>();

  @HostBinding('class.host-card--hovered') protected hovered = false;
  @HostBinding('class.host-card--pressed') protected pressed = false;
  @HostBinding('attr.aria-pressed') protected get ariaPressed(): string {
    return String(this.pressed);
  }

  @HostListener('mouseenter')
  protected onMouseEnter(): void {
    this.hovered = true;
    this.appHostInteractionTriggered.emit('mouseenter changed the host class.');
  }

  @HostListener('mouseleave')
  protected onMouseLeave(): void {
    this.hovered = false;
    this.appHostInteractionTriggered.emit(
      'mouseleave removed the hover class.'
    );
  }

  @HostListener('click')
  protected onClick(): void {
    this.pressed = !this.pressed;
    this.appHostInteractionTriggered.emit('click toggled aria-pressed.');
  }
}

@Component({
  selector: 'app-host-interaction-demo',
  imports: [HostInteractionDirective],
  templateUrl: './host-interaction-demo.html',
  styleUrl: './host-interaction-demo.css',
})
export class HostInteractionDemo {
  protected readonly log = signal<string[]>([
    'Hover or click the host card to see directive events.',
  ]);

  protected addLog(message: string): void {
    this.log.update((entries) => [message, ...entries].slice(0, 5));
  }

  protected clearLog(): void {
    this.log.set(['Log cleared. Try hovering or clicking again.']);
  }
}

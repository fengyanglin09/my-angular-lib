import {
  Component,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

type Status = 'danger' | 'healthy' | 'warning';

const statusStyles: Record<
  Status,
  { background: string; border: string; label: string }
> = {
  danger: {
    background: '#fff1f2',
    border: '#fb7185',
    label: 'Danger state needs attention.',
  },
  healthy: {
    background: '#ecfdf5',
    border: '#34d399',
    label: 'Healthy state is ready.',
  },
  warning: {
    background: '#fffbeb',
    border: '#f59e0b',
    label: 'Warning state needs review.',
  },
};

@Directive({
  selector: '[appStatusHighlight]',
})
export class StatusHighlightDirective {
  readonly appStatusHighlight = input<Status>('healthy');

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const style = statusStyles[this.appStatusHighlight()];
      const host = this.element.nativeElement;

      this.renderer.setStyle(host, 'background', style.background);
      this.renderer.setStyle(host, 'borderColor', style.border);
      this.renderer.setAttribute(host, 'data-status-label', style.label);
    });
  }
}

@Component({
  selector: 'app-status-highlight-demo',
  imports: [StatusHighlightDirective],
  templateUrl: './status-highlight-demo.html',
  styleUrl: './status-highlight-demo.css',
})
export class StatusHighlightDemo {
  protected readonly status = signal<Status>('healthy');
  protected readonly statuses: Status[] = ['healthy', 'warning', 'danger'];

  protected setStatus(status: Status): void {
    this.status.set(status);
  }
}

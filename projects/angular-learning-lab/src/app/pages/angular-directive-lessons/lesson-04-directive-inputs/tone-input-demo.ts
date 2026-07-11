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

type Tone = 'info' | 'success' | 'warning';
type ToneSize = 'comfortable' | 'compact';

const toneColors: Record<
  Tone,
  { background: string; border: string; text: string }
> = {
  info: {
    background: '#eff6ff',
    border: '#60a5fa',
    text: '#1d4ed8',
  },
  success: {
    background: '#ecfdf5',
    border: '#34d399',
    text: '#047857',
  },
  warning: {
    background: '#fffbeb',
    border: '#f59e0b',
    text: '#b45309',
  },
};

@Directive({
  selector: '[appTonePanel]',
})
export class TonePanelDirective {
  readonly appTonePanel = input<Tone>('info');
  readonly toneSize = input<ToneSize>('comfortable');

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const tone = toneColors[this.appTonePanel()];
      const padding = this.toneSize() === 'compact' ? '14px' : '24px';
      const host = this.element.nativeElement;

      this.renderer.setStyle(host, 'background', tone.background);
      this.renderer.setStyle(host, 'borderColor', tone.border);
      this.renderer.setStyle(host, 'color', tone.text);
      this.renderer.setStyle(host, 'padding', padding);
    });
  }
}

@Component({
  selector: 'app-tone-input-demo',
  imports: [TonePanelDirective],
  templateUrl: './tone-input-demo.html',
  styleUrl: './tone-input-demo.css',
})
export class ToneInputDemo {
  protected readonly tone = signal<Tone>('info');
  protected readonly toneSize = signal<ToneSize>('comfortable');
  protected readonly tones: Tone[] = ['info', 'success', 'warning'];
  protected readonly sizes: ToneSize[] = ['comfortable', 'compact'];

  protected setTone(tone: Tone): void {
    this.tone.set(tone);
  }

  protected setToneSize(toneSize: ToneSize): void {
    this.toneSize.set(toneSize);
  }
}

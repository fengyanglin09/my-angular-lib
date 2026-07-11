import {
  Component,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

type ProblemType = 'behavior' | 'layout';

@Directive({
  selector: '[appAttention]',
})
export class AttentionDirective {
  readonly appAttention = input(false);

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const host = this.element.nativeElement;
      const active = this.appAttention();

      this.renderer.setStyle(
        host,
        'borderColor',
        active ? '#f59e0b' : '#dbe2e8'
      );
      this.renderer.setStyle(
        host,
        'background',
        active ? '#fffbeb' : '#ffffff'
      );
    });
  }
}

@Component({
  selector: 'app-empty-state-panel',
  templateUrl: './empty-state-panel.html',
  styleUrl: './empty-state-panel.css',
})
export class EmptyStatePanel {}

@Component({
  selector: 'app-directive-vs-component-demo',
  imports: [AttentionDirective, EmptyStatePanel],
  templateUrl: './directive-vs-component-demo.html',
  styleUrl: './directive-vs-component-demo.css',
})
export class DirectiveVsComponentDemo {
  protected readonly problemType = signal<ProblemType>('behavior');
  protected readonly recommendation = computed(() =>
    this.problemType() === 'behavior'
      ? 'Use a directive: the element already exists and only needs behavior.'
      : 'Use a component: the UI needs its own markup, layout, and content structure.'
  );

  protected chooseProblem(problemType: ProblemType): void {
    this.problemType.set(problemType);
  }
}

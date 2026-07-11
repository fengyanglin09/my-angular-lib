import {
  Component,
  Directive,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appFocusRing]',
})
export class FocusRingDirective {
  @HostBinding('class.composed-button--focused') protected focused = false;

  @HostListener('focusin')
  protected onFocusIn(): void {
    this.focused = true;
  }

  @HostListener('focusout')
  protected onFocusOut(): void {
    this.focused = false;
  }
}

@Directive({
  selector: '[appPressedState]',
})
export class PressedStateDirective {
  @HostBinding('class.composed-button--pressed') protected pressed = false;

  @HostListener('pointerdown')
  protected onPointerDown(): void {
    this.pressed = true;
  }

  @HostListener('window:pointerup')
  protected onPointerUp(): void {
    this.pressed = false;
  }
}

@Component({
  selector: 'app-composed-action-button',
  hostDirectives: [FocusRingDirective, PressedStateDirective],
  templateUrl: './composed-action-button.html',
  styleUrl: './composed-action-button.css',
})
export class ComposedActionButton {}

@Component({
  selector: 'app-composition-demo',
  imports: [ComposedActionButton],
  templateUrl: './composition-demo.html',
  styleUrl: './composition-demo.css',
})
export class CompositionDemo {
  protected readonly actionCount = signal(0);

  protected runAction(): void {
    this.actionCount.update((count) => count + 1);
  }
}

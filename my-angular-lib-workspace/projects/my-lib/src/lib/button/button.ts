import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  @Input() label = 'Click me!!';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';

  onClick() {
    this.disabled = !this.disabled;
  }
}

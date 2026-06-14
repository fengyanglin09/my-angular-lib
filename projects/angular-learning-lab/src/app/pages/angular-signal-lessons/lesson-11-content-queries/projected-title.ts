import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appProjectedTitle]',
})
export class ProjectedTitle {
  readonly titleLabel = input('Untitled');
}

import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appProjectedAction]',
})
export class ProjectedAction {
  readonly actionLabel = input('Action');
}

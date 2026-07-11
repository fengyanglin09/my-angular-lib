import { Component } from '@angular/core';

import type { DirectiveLesson } from '../angular-directive-lessons.models';
import { DirectiveLessonPage } from '../directive-lesson-page/directive-lesson-page';
import { HostInteractionDemo } from './host-interaction-demo';

export const directiveLesson03 = {
  number: 3,
  route: 'lesson-03-host-binding-listener',
  title: 'Host Binding And Host Listener',
  intro:
    'Host bindings write values onto the element that owns the directive. Host listeners react to events from that same element.',
  keyPoints: [
    'The host element is the element where the directive attribute is placed.',
    '`@HostBinding` keeps host classes, styles, attributes, or properties in sync.',
    '`@HostListener` handles events without wiring every event in the parent template.',
  ],
  mentalModel: `directive instance
  lives on host element

host binding
  writes to host

host listener
  hears host events`,
  demo: {
    title: 'Interactive host state',
    before: 'The host button has no hover or pressed state.',
    after: 'The directive toggles host classes and aria state.',
    actionLabel: 'Run host binding demo',
  },
  codeSteps: [
    {
      name: 'Bind a class',
      description: 'HostBinding writes directly to the directive host element.',
      syntax: `@HostBinding('class.is-hovered')
protected hovered = false;`,
    },
    {
      name: 'Listen to host events',
      description:
        'HostListener reacts to events coming from the host element.',
      syntax: `@HostListener('mouseenter')
onMouseEnter() {
  this.hovered = true;
}`,
    },
    {
      name: 'Bind accessibility state',
      description:
        'Directives can keep attributes like aria-pressed synchronized.',
      syntax: `@HostBinding('attr.aria-pressed')
get ariaPressed() {
  return String(this.pressed);
}`,
    },
  ],
} satisfies DirectiveLesson;

@Component({
  selector: 'app-directive-lesson-03-host-binding-listener',
  imports: [DirectiveLessonPage, HostInteractionDemo],
  templateUrl: './lesson-03-host-binding-listener.html',
  styleUrl: './lesson-03-host-binding-listener.css',
})
export class DirectiveLesson03HostBindingListener {
  protected readonly lesson = directiveLesson03;
}

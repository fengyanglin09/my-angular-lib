import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { InputOutputModelDemo } from './input-output-model-demo';

export const componentLesson02 = {
  number: 2,
  route: 'lesson-02-input-output-model',
  title: 'input, output, and model',
  intro:
    'Modern Angular component APIs often start with input for parent-to-child data, output for child-to-parent events, and model for two-way component state.',
  keyPoints: [
    'Use input when the parent owns the value.',
    'Use output when the child reports something happened.',
    'Use model when the component is a reusable control-like component.',
  ],
  mentalModel: `input
  parent gives value to child

output
  child tells parent something happened

model
  parent and child share control value updates`,
  demo: {
    title: 'Quantity picker API',
    before: 'Parent owns quantity = 1.',
    after: 'Child updates quantity through model.',
    actionLabel: 'Simulate quantity change',
  },
  codeSteps: [
    {
      name: 'Child API',
      description:
        'Inputs configure the component. Model represents the editable value.',
      syntax: `quantity = model<number>(1);
label = input<string>('Quantity');
saved = output<number>();`,
    },
    {
      name: 'Parent template',
      description:
        'Banana syntax connects the parent signal to the child model.',
      syntax: `<app-quantity-picker
  [(quantity)]="cartQuantity"
  label="Cart Quantity"
  (saved)="saveQuantity($event)"
/>`,
    },
    {
      name: 'Child event',
      description:
        'The output is for intent, not for mirroring every value change.',
      syntax: `save(): void {
  this.saved.emit(this.quantity());
}`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-02-input-output-model',
  imports: [ComponentsLessonPage, InputOutputModelDemo],
  templateUrl: './lesson-02-input-output-model.html',
  styleUrl: './lesson-02-input-output-model.css',
})
export class ComponentsLesson02InputOutputModel {
  protected readonly lesson = componentLesson02;
}

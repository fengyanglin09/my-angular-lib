import { Component } from '@angular/core';

import type { ComponentLesson } from '../angular-components-lessons.models';
import { ComponentsLessonPage } from '../components-lesson-page/components-lesson-page';
import { StateOwnershipDemo } from './state-ownership-demo';

export const componentLesson08 = {
  number: 8,
  route: 'lesson-08-state-ownership',
  title: 'State Ownership Boundaries',
  intro:
    'A component design becomes easier when each piece of state has a clear owner. Inputs should not be copied into local state unless you intentionally need editable draft state.',
  keyPoints: [
    'If the parent owns the source of truth, the child should read an input and emit changes.',
    'If the child owns temporary UI state, keep it local.',
    'Copying inputs into local signals can create stale duplicated state unless it is a deliberate draft pattern.',
  ],
  mentalModel: `source of truth
  one owner

child local state
  UI-only or draft state

duplicated state
  useful for forms/drafts
  risky for display-only data`,
  demo: {
    title: 'Editable draft starts from an input but becomes local',
    before: 'Parent passes saved profile.',
    after: 'Child edits draft and emits save.',
    actionLabel: 'Simulate save draft',
  },
  codeSteps: [
    {
      name: 'Display-only child',
      description:
        'No copy is needed when the child only displays parent data.',
      syntax: `profile = input.required<Profile>();`,
    },
    {
      name: 'Editable draft child',
      description:
        'A local draft is okay when the user can edit before saving.',
      syntax: `profile = input.required<Profile>();
draftName = signal('');

ngOnInit(): void {
  this.draftName.set(this.profile().name);
}`,
    },
    {
      name: 'Save intent',
      description:
        'The child emits the draft; the parent decides how to persist it.',
      syntax: `saved = output<ProfileDraft>();

save(): void {
  this.saved.emit({ name: this.draftName() });
}`,
    },
  ],
} satisfies ComponentLesson;

@Component({
  selector: 'app-components-lesson-08-state-ownership',
  imports: [ComponentsLessonPage, StateOwnershipDemo],
  templateUrl: './lesson-08-state-ownership.html',
  styleUrl: './lesson-08-state-ownership.css',
})
export class ComponentsLesson08StateOwnership {
  protected readonly lesson = componentLesson08;
}

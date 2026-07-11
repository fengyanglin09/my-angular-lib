import { Component, computed, signal } from '@angular/core';

type CommunicationPattern = 'input-output' | 'shared-service' | 'router-state';

interface PatternDetails {
  code: string;
  description: string;
  label: string;
  message: string;
}

@Component({
  selector: 'app-component-communication-demo',
  templateUrl: './component-communication-demo.html',
  styleUrl: './component-communication-demo.css',
})
export class ComponentCommunicationDemo {
  private readonly patterns: Record<CommunicationPattern, PatternDetails> = {
    'input-output': {
      label: 'Input / Output',
      description:
        'Best for direct parent-child communication where the parent owns the value.',
      message: 'Child emitted selected. Parent updated selectedCourse.',
      code: `<app-course-list
  [courses]="courses()"
  (selected)="selectCourse($event)"
/>`,
    },
    'shared-service': {
      label: 'Shared Service',
      description:
        'Useful for sibling components inside the same feature when route state would be too heavy.',
      message:
        'List wrote to a feature service. Details panel read the same service signal.',
      code: `courseSelectionService.select(courseId);
selectedCourse = courseSelectionService.selectedCourse;`,
    },
    'router-state': {
      label: 'Router State',
      description:
        'Useful when the selected state should survive refresh, deep links, or browser back/forward.',
      message:
        'Navigation changed the URL. Detail component read the route parameter.',
      code: `<a [routerLink]="['/courses', course.id]">
  Open course
</a>`,
    },
  };

  protected readonly selectedPattern =
    signal<CommunicationPattern>('input-output');
  protected readonly eventCount = signal(0);
  protected readonly selectedCourse = signal('Signals for Components');
  protected readonly activeDetails = computed(
    () => this.patterns[this.selectedPattern()]
  );
  protected readonly lastEvent = signal(
    'Pick a pattern, then send a course selection.'
  );

  protected choosePattern(pattern: CommunicationPattern): void {
    this.selectedPattern.set(pattern);
    this.lastEvent.set(`Switched to ${this.patterns[pattern].label}.`);
  }

  protected sendSelection(): void {
    const nextCourse =
      this.selectedCourse() === 'Signals for Components'
        ? 'Reusable Component APIs'
        : 'Signals for Components';

    this.selectedCourse.set(nextCourse);
    this.eventCount.update((count) => count + 1);
    this.lastEvent.set(this.activeDetails().message);
  }
}

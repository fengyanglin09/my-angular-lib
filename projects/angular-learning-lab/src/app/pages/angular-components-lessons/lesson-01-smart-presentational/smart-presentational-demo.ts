import { Component, input, output, signal } from '@angular/core';

interface DemoCourse {
  duration: string;
  level: string;
  title: string;
}

@Component({
  selector: 'app-course-summary-card-demo',
  template: `
    <article class="course-card">
      <p class="eyebrow">Presentational child</p>
      <h3>{{ course().title }}</h3>
      <dl>
        <div>
          <dt>Level</dt>
          <dd>{{ course().level }}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{{ course().duration }}</dd>
        </div>
      </dl>
      <button type="button" (click)="refreshClicked.emit()">
        Ask parent to refresh
      </button>
    </article>
  `,
})
export class CourseSummaryCardDemo {
  readonly course = input.required<DemoCourse>();
  readonly refreshClicked = output<void>();
}

@Component({
  selector: 'app-smart-presentational-demo',
  imports: [CourseSummaryCardDemo],
  templateUrl: './smart-presentational-demo.html',
  styleUrl: './smart-presentational-demo.css',
})
export class SmartPresentationalDemo {
  private readonly courses: DemoCourse[] = [
    {
      title: 'Angular Component Design',
      level: 'Intermediate',
      duration: '42 minutes',
    },
    {
      title: 'Reusable UI APIs',
      level: 'Practical',
      duration: '28 minutes',
    },
    {
      title: 'State Ownership Boundaries',
      level: 'Advanced',
      duration: '35 minutes',
    },
  ];

  protected readonly selectedCourse = signal(this.courses[0]);
  protected readonly refreshCount = signal(0);
  protected readonly log = signal(
    'Smart parent owns data selection. Child only renders and emits intent.'
  );

  protected refreshCourse(): void {
    const nextIndex = (this.refreshCount() + 1) % this.courses.length;

    this.refreshCount.update((count) => count + 1);
    this.selectedCourse.set(this.courses[nextIndex]);
    this.log.set(
      'Child emitted refreshClicked. Smart parent chose the next course.'
    );
  }
}

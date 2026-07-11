import { Component, Pipe, PipeTransform, signal } from '@angular/core';

interface Course {
  level: 'advanced' | 'beginner' | 'intermediate';
  title: string;
}

let courseFilterRunCount = 0;

@Pipe({
  name: 'courseSearchSummary',
})
export class CourseSearchSummaryPipe implements PipeTransform {
  transform(courses: Course[], query: string): string {
    courseFilterRunCount += 1;
    const normalizedQuery = query.trim().toLowerCase();
    const matches = normalizedQuery
      ? courses.filter((course) =>
          `${course.title} ${course.level}`
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : courses;

    return `${matches.length} matches: ${matches
      .map((course) => course.title)
      .join(', ')}. Transform #${courseFilterRunCount}.`;
  }
}

@Component({
  selector: 'app-pipe-performance-demo',
  imports: [CourseSearchSummaryPipe],
  templateUrl: './pipe-performance-demo.html',
  styleUrl: './pipe-performance-demo.css',
})
export class PipePerformanceDemo {
  protected courses: Course[] = [
    { level: 'beginner', title: 'Angular Forms' },
    { level: 'intermediate', title: 'RxJS Streams' },
    { level: 'advanced', title: 'NgRx Effects' },
  ];
  protected readonly query = signal('');
  protected readonly renderTick = signal(0);
  protected readonly lastAction = signal('Start with an empty search query.');

  protected searchAngular(): void {
    this.query.set('angular');
    this.lastAction.set('Changed the query input, so the pure pipe reruns.');
  }

  protected searchAdvanced(): void {
    this.query.set('advanced');
    this.lastAction.set('Changed the query input again.');
  }

  protected forceRender(): void {
    this.renderTick.update((tick) => tick + 1);
    this.lastAction.set('Forced a render without changing pipe inputs.');
  }

  protected replaceCourses(): void {
    this.courses = [
      ...this.courses,
      {
        level: 'intermediate',
        title: `Pipe Patterns ${this.courses.length + 1}`,
      },
    ];
    this.renderTick.update((tick) => tick + 1);
    this.lastAction.set('Replaced the courses array with a new reference.');
  }
}

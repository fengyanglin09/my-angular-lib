import { Component, computed, signal } from '@angular/core';

interface DemoCourse {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
}

@Component({
  selector: 'app-avoid-recomputation-demo',
  templateUrl: './avoid-recomputation-demo.html',
  styleUrl: './avoid-recomputation-demo.css',
})
export class AvoidRecomputationDemo {
  private expensiveRuns = 0;

  protected readonly query = signal('');
  protected readonly unrelatedCounter = signal(0);
  protected readonly courses = signal<DemoCourse[]>([
    { id: 'signals', title: 'Angular Signals', level: 'intermediate' },
    { id: 'ngrx', title: 'NgRx Effects', level: 'advanced' },
    { id: 'forms', title: 'Reactive Forms', level: 'beginner' },
    { id: 'routes', title: 'Router Guards', level: 'intermediate' },
  ]);
  protected readonly filteredCourses = computed(() => {
    this.expensiveRuns += 1;
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.courses();
    }

    return this.courses().filter((course) =>
      `${course.title} ${course.level}`.toLowerCase().includes(query)
    );
  });

  protected get expensiveRunCount(): number {
    return this.expensiveRuns;
  }

  protected setQuery(query: string): void {
    this.query.set(query);
  }

  protected bumpUnrelatedCounter(): void {
    this.unrelatedCounter.update((count) => count + 1);
  }

  protected addCourse(): void {
    this.courses.update((courses) => [
      ...courses,
      {
        id: `performance-${courses.length}`,
        title: 'Performance Patterns',
        level: 'advanced',
      },
    ]);
  }
}

import { Component, signal } from '@angular/core';

interface CourseRow {
  id: string;
  title: string;
  level: string;
}

@Component({
  selector: 'app-for-track-demo',
  templateUrl: './for-track-demo.html',
  styleUrl: './for-track-demo.css',
})
export class ForTrackDemo {
  protected readonly courses = signal<CourseRow[]>([
    { id: 'ngrx', title: 'NgRx Effects', level: 'Advanced' },
    { id: 'signals', title: 'Angular Signals', level: 'Intermediate' },
    { id: 'forms', title: 'Reactive Forms', level: 'Practical' },
  ]);
  protected readonly lastAction = signal(
    'Type notes in a row, then sort or insert. Stable id tracking keeps each note with the right course.'
  );

  protected sortByTitle(): void {
    this.courses.update((courses) =>
      [...courses].sort((a, b) => a.title.localeCompare(b.title))
    );
    this.lastAction.set('Sorted by title. Rows are matched by course.id.');
  }

  protected insertCourse(): void {
    this.courses.update((courses) => [
      {
        id: `http-${courses.length}`,
        title: 'HTTP Performance',
        level: 'Practical',
      },
      ...courses,
    ]);
    this.lastAction.set('Inserted a new row at the top.');
  }
}

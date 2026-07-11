import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CourseDto {
  category: string;
  id: number;
  level: string;
  minutes: number;
  title: string;
}

export interface CreateCourseRequest {
  category: string;
  level: string;
  minutes: number;
  title: string;
}

const initialCourses: CourseDto[] = [
  {
    category: 'Angular',
    id: 201,
    level: 'Beginner',
    minutes: 28,
    title: 'HttpClient Basics',
  },
  {
    category: 'Angular',
    id: 202,
    level: 'Intermediate',
    minutes: 34,
    title: 'Typed API Services',
  },
];

@Injectable({
  providedIn: 'root',
})
export class Lesson02CoursesApi {
  private courses = [...initialCourses];
  private nextId = 203;

  listCourses(): Observable<CourseDto[]> {
    return new Observable<CourseDto[]>((observer) => {
      const timerId = window.setTimeout(() => {
        observer.next([...this.courses]);
        observer.complete();
      }, 250);

      return () => window.clearTimeout(timerId);
    });
  }

  createCourse(draft: CreateCourseRequest, shouldFail: boolean): Observable<CourseDto> {
    return new Observable<CourseDto>((observer) => {
      const timerId = window.setTimeout(() => {
        if (shouldFail) {
          observer.error(new Error('The fake API rejected the create request.'));
          return;
        }

        const created: CourseDto = {
          ...draft,
          id: this.nextId,
        };

        this.nextId += 1;
        this.courses = [created, ...this.courses];
        observer.next(created);
        observer.complete();
      }, 650);

      return () => window.clearTimeout(timerId);
    });
  }

  reset(): Observable<CourseDto[]> {
    return new Observable<CourseDto[]>((observer) => {
      const timerId = window.setTimeout(() => {
        this.courses = [...initialCourses];
        this.nextId = 203;
        observer.next([...this.courses]);
        observer.complete();
      }, 250);

      return () => window.clearTimeout(timerId);
    });
  }
}

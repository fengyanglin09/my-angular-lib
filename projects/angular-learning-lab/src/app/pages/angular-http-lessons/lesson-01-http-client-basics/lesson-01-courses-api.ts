import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CourseDto {
  category: string;
  id: number;
  level: string;
  minutes: number;
  title: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class Lesson01CoursesApi {
  private readonly http = inject(HttpClient);

  loadCourses(shouldFail: boolean): Observable<CourseDto[]> {
    const url = shouldFail
      ? '/http-lessons/missing-courses.json'
      : '/http-lessons/courses.json';

    return this.http.get<CourseDto[]>(url);
  }
}

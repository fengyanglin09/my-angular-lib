import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CourseDto {
  category: string;
  id: string;
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

export type UpdateCourseRequest = Partial<CreateCourseRequest>;

@Injectable({
  providedIn: 'root',
})
export class Lesson03JsonServerCoursesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/courses';

  createCourse(draft: CreateCourseRequest): Observable<CourseDto> {
    return this.http.post<CourseDto>(this.baseUrl, draft);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  loadCourses(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this.baseUrl);
  }

  updateCourse(id: string, draft: UpdateCourseRequest): Observable<CourseDto> {
    return this.http.patch<CourseDto>(`${this.baseUrl}/${id}`, draft);
  }
}

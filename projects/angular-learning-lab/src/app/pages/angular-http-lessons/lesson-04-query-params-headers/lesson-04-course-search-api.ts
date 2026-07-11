import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface CourseDto {
  category: string;
  id: string;
  level: string;
  minutes: number;
  title: string;
}

export interface CourseSearchQuery {
  category: string;
  level: string;
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
  sort: 'minutes' | 'title';
}

export interface CourseSearchResult {
  courses: CourseDto[];
  method: string;
  requestId: string;
  status: number;
  url: string;
}

interface JsonServerPageResponse {
  data?: CourseDto[];
  items?: CourseDto[];
}

type CoursesResponseBody = CourseDto[] | JsonServerPageResponse | null;

@Injectable({ providedIn: 'root' })
export class Lesson04CourseSearchApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/courses';

  searchCourses(query: CourseSearchQuery): Observable<CourseSearchResult> {
    const requestId = `lesson-04-${Date.now()}`;
    const params = this.createParams(query);
    const headers = new HttpHeaders()
      .set('X-Lesson-Request-Id', requestId)
      .set('X-Lesson-Client', 'angular-learning-lab');

    return this.http
      .get<CoursesResponseBody>(this.baseUrl, {
        headers,
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => ({
          courses: this.readCourses(response.body),
          method: 'GET /courses',
          requestId,
          status: response.status,
          url: response.url ?? this.createFallbackUrl(params),
        })),
      );
  }

  private createParams(query: CourseSearchQuery): HttpParams {
    let params = new HttpParams()
      .set('_page', query.page)
      .set('_per_page', query.pageSize)
      .set('_sort', query.sort)
      .set('_order', query.order);

    if (query.category !== 'All') {
      params = params.set('category', query.category);
    }

    if (query.level !== 'All') {
      params = params.set('level', query.level);
    }

    return params;
  }

  private createFallbackUrl(params: HttpParams): string {
    return `${this.baseUrl}?${params.toString()}`;
  }

  private readCourses(body: CoursesResponseBody): CourseDto[] {
    if (Array.isArray(body)) {
      return body;
    }

    return body?.data ?? body?.items ?? [];
  }
}

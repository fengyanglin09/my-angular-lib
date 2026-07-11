import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CourseDto {
  category?: unknown;
  id?: unknown;
  level?: unknown;
  minutes?: unknown;
  title?: unknown;
}

interface ValidCourseDto {
  category: string;
  id: string;
  level: string;
  minutes: number;
  title: string;
}

interface CourseViewModel {
  badge: string;
  id: string;
  lengthLabel: string;
  title: string;
}

interface MappingState {
  error: string | null;
  raw: CourseDto[];
  viewModels: CourseViewModel[];
}

@Component({
  selector: 'app-lesson-09-dto-mapping-validation',
  imports: [JsonPipe, LearningNav],
  templateUrl: './lesson-09-dto-mapping-validation.html',
  styleUrl: './lesson-09-dto-mapping-validation.css',
})
export class Lesson09DtoMappingValidation {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);

  protected readonly state = signal<MappingState>({
    error: null,
    raw: [],
    viewModels: [],
  });

  protected readonly codeSteps = [
    {
      name: 'DTO',
      syntax: `interface CourseDto {
  id: unknown;
  title: unknown;
  minutes: unknown;
}`,
    },
    {
      name: 'Validate boundary',
      syntax: `if (typeof dto.title !== 'string') {
  throw new Error('Course title is invalid');
}`,
    },
    {
      name: 'Map for UI',
      syntax: `return {
  title: dto.title,
  lengthLabel: dto.minutes + ' minutes',
};`,
    },
  ];

  protected loadBadData(): void {
    const badDtos: CourseDto[] = [
      {
        id: 'bad-1',
        minutes: 'not a number',
        title: 'Broken backend course',
      },
    ];

    this.mapDtos(badDtos, 'Local malformed DTO example');
  }

  protected loadGoodData(): void {
    this.http.get<CourseDto[]>('/http-lessons/courses.json').pipe(
      map((dtos) => this.createMappingState(dtos)),
      catchError((error: Error) =>
        of({
          error: error.message,
          raw: [],
          viewModels: [],
        }),
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((state) => this.state.set(state));
  }

  private mapDtos(dtos: CourseDto[], source: string): void {
    try {
      this.state.set(this.createMappingState(dtos));
    } catch (error) {
      this.state.set({
        error: `${source}: ${error instanceof Error ? error.message : 'Unknown mapping error'}`,
        raw: dtos,
        viewModels: [],
      });
    }
  }

  private createMappingState(dtos: CourseDto[]): MappingState {
    return {
      error: null,
      raw: dtos,
      viewModels: dtos.map((dto) => this.toViewModel(this.validateCourse(dto))),
    };
  }

  private validateCourse(dto: CourseDto): ValidCourseDto {
    if (typeof dto.id !== 'string') {
      throw new Error('Course id must be a string.');
    }

    if (typeof dto.title !== 'string') {
      throw new Error('Course title must be a string.');
    }

    if (typeof dto.category !== 'string') {
      throw new Error('Course category must be a string.');
    }

    if (typeof dto.level !== 'string') {
      throw new Error('Course level must be a string.');
    }

    if (typeof dto.minutes !== 'number') {
      throw new Error('Course minutes must be a number.');
    }

    return {
      category: dto.category,
      id: dto.id,
      level: dto.level,
      minutes: dto.minutes,
      title: dto.title,
    };
  }

  private toViewModel(dto: ValidCourseDto): CourseViewModel {
    return {
      badge: `${dto.category} / ${dto.level}`,
      id: dto.id,
      lengthLabel: `${dto.minutes} minutes`,
      title: dto.title,
    };
  }
}

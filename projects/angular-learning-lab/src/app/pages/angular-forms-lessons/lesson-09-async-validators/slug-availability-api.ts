import { Injectable } from '@angular/core';

const takenSlugs = new Set(['admin', 'angular-lab', 'forms-guide']);

@Injectable({
  providedIn: 'root',
})
export class SlugAvailabilityApi {
  checkSlug(slug: string): Promise<boolean> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(!takenSlugs.has(slug.trim().toLowerCase()));
      }, 800);
    });
  }
}

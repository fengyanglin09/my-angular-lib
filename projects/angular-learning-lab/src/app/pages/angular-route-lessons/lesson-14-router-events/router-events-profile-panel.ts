import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { EventProfile } from './router-events-profile.service';

const initialProfile: EventProfile = {
  id: 'loading',
  name: 'Waiting for resolver',
  role: 'Loading',
  summary: 'The resolver result will appear here after ResolveEnd.',
};

@Component({
  selector: 'app-router-events-profile-panel',
  template: `
    <article class="event-panel">
      <p class="eyebrow">Resolved child route</p>
      <h3>{{ profile().name }}</h3>
      <strong>{{ profile().role }}</strong>
      <p>{{ profile().summary }}</p>
      <strong>Profile id: {{ profile().id }}</strong>
    </article>
  `,
  styles: [
    `
      .event-panel {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      h3,
      p {
        margin: 0;
      }

      p {
        color: #606b78;
      }
    `,
  ],
})
export class RouterEventsProfilePanel {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly profile = signal<EventProfile>(initialProfile);

  constructor() {
    this.route.data
      .pipe(
        map((data) => data['profile'] as EventProfile),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((profile) => {
        this.profile.set(profile);
      });
  }
}

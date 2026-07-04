import { Injectable } from '@angular/core';

export interface EventProfile {
  id: string;
  name: string;
  role: string;
  summary: string;
}

const eventProfiles: Record<string, EventProfile> = {
  ada: {
    id: 'ada',
    name: 'Ada Lovelace',
    role: 'Route Analyst',
    summary: 'Ada reviews route timelines and catches redirect bugs before release.',
  },
  grace: {
    id: 'grace',
    name: 'Grace Hopper',
    role: 'Resolver Specialist',
    summary: 'Grace makes sure profile data is ready before the routed panel activates.',
  },
  linus: {
    id: 'linus',
    name: 'Linus Torvalds',
    role: 'Navigation Reviewer',
    summary: 'Linus checks guard and resolver order when routes become hard to reason about.',
  },
};

@Injectable({ providedIn: 'root' })
export class RouterEventsProfileService {
  loadProfile(profileId: string): EventProfile {
    return (
      eventProfiles[profileId] ?? {
        id: profileId,
        name: `Unknown profile: ${profileId}`,
        role: 'Missing profile',
        summary: 'The resolver used the route param, but the fake database had no matching row.',
      }
    );
  }
}

import { Component, computed, signal } from '@angular/core';

interface Profile {
  name: string;
  role: string;
}

@Component({
  selector: 'app-state-ownership-demo',
  templateUrl: './state-ownership-demo.html',
  styleUrl: './state-ownership-demo.css',
})
export class StateOwnershipDemo {
  protected readonly savedProfile = signal<Profile>({
    name: 'Mina Chen',
    role: 'Frontend lead',
  });
  protected readonly draftProfile = signal<Profile>({
    name: 'Mina Chen',
    role: 'Frontend lead',
  });
  protected readonly lastAction = signal(
    'Saved profile is parent-owned. Draft profile is local editable state.'
  );
  protected readonly hasUnsavedChanges = computed(
    () =>
      this.savedProfile().name !== this.draftProfile().name ||
      this.savedProfile().role !== this.draftProfile().role
  );

  protected editDraftName(): void {
    this.draftProfile.update((profile) => ({
      ...profile,
      name: profile.name === 'Mina Chen' ? 'Mina Patel' : 'Mina Chen',
    }));
    this.lastAction.set(
      'Changed local draft only. Saved parent value did not move.'
    );
  }

  protected editDraftRole(): void {
    this.draftProfile.update((profile) => ({
      ...profile,
      role:
        profile.role === 'Frontend lead'
          ? 'Design systems lead'
          : 'Frontend lead',
    }));
    this.lastAction.set('Changed another draft field before saving.');
  }

  protected saveDraft(): void {
    this.savedProfile.set(this.draftProfile());
    this.lastAction.set('Saved draft. Parent-owned saved profile now matches.');
  }

  protected resetDraft(): void {
    this.draftProfile.set(this.savedProfile());
    this.lastAction.set('Reset draft from the parent-owned saved profile.');
  }
}

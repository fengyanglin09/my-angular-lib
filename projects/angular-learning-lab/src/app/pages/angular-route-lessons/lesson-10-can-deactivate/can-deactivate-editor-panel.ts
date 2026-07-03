import { Component, inject, signal } from '@angular/core';

import { CanDeactivateDemoService } from './can-deactivate-demo.service';
import {
  PendingChangesComponent,
  PendingChangesDecision,
} from './pending-changes.guard';

@Component({
  selector: 'app-can-deactivate-editor-panel',
  template: `
    <article class="editor-card">
      <div>
        <p class="eyebrow">Guarded editor route</p>
        <h3>Release Notes Draft</h3>
        <p>
          This child route has <code>canDeactivate</code>. Unsaved edits pause
          navigation until the user chooses what to do.
        </p>
      </div>

      <label>
        Draft text
        <textarea
          [value]="draft()"
          (input)="updateDraft($event)"
          rows="5"
        ></textarea>
      </label>

      <div class="editor-actions">
        <button type="button" (click)="saveDraft()">Save draft</button>
        <button type="button" (click)="resetDraft()">Reset draft</button>
      </div>

      <dl>
        <div>
          <dt>Dirty</dt>
          <dd>{{ dirty() ? 'true' : 'false' }}</dd>
        </div>
        <div>
          <dt>Decision dialog</dt>
          <dd>{{ dialogOpen() ? 'open' : 'closed' }}</dd>
        </div>
      </dl>

      @if (dialogOpen()) {
        <section class="decision-dialog" aria-labelledby="unsaved-title">
          <div>
            <p class="eyebrow">Unsaved changes</p>
            <h4 id="unsaved-title">Leave this editor?</h4>
            <p>
              The router is waiting for this component to resolve the
              <code>canDeactivate</code> decision.
            </p>
          </div>

          <div class="editor-actions">
            <button type="button" (click)="saveAndLeave()">Save changes and leave</button>
            <button type="button" (click)="discardAndLeave()">Discard changes and leave</button>
            <button type="button" (click)="stayEditing()">Stay editing</button>
          </div>
        </section>
      }
    </article>
  `,
  styles: [
    `
      .editor-card {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 16px;
        padding: 18px;
      }

      h3,
      p {
        margin: 0;
      }

      p,
      dd {
        color: #606b78;
      }

      label {
        color: #20252b;
        display: grid;
        font-weight: 800;
        gap: 8px;
      }

      textarea {
        border: 1px solid #bdc7d0;
        border-radius: 8px;
        color: #20252b;
        font: inherit;
        min-height: 130px;
        padding: 12px;
        resize: vertical;
      }

      .editor-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .decision-dialog {
        background: #fff7ed;
        border: 1px solid #f1c48b;
        border-radius: 8px;
        display: grid;
        gap: 14px;
        padding: 16px;
      }

      .decision-dialog h4 {
        margin: 0;
      }

      button {
        background: #ffffff;
        border: 1px solid #bdc7d0;
        border-radius: 8px;
        color: #315a85;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 42px;
        padding: 0 14px;
      }
    `,
  ],
})
export class CanDeactivateEditorPanel implements PendingChangesComponent {
  private readonly demo = inject(CanDeactivateDemoService);
  private readonly savedDraft = signal(
    'Initial release notes: routing lessons now include guards and resolvers.',
  );

  readonly draft = signal(this.savedDraft());
  readonly dirty = signal(false);
  readonly dialogOpen = signal(false);

  private pendingDecision?: (canLeave: boolean) => void;
  private pendingDecisionPromise?: Promise<boolean>;

  updateDraft(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.draft.set(textarea.value);
    this.dirty.set(this.draft() !== this.savedDraft());
  }

  saveDraft(): void {
    this.savedDraft.set(this.draft());
    this.dirty.set(false);
    this.demo.addLog('Draft saved. The editor can now be left.');
  }

  resetDraft(): void {
    this.draft.set(this.savedDraft());
    this.dirty.set(false);
    this.demo.addLog('Draft reset to the saved value.');
  }

  saveAndLeave(): void {
    this.savedDraft.set(this.draft());
    this.dirty.set(false);
    this.demo.addLog('User chose to save changes before leaving.');
    this.resolvePendingDecision(true);
  }

  discardAndLeave(): void {
    this.draft.set(this.savedDraft());
    this.dirty.set(false);
    this.demo.addLog('User chose to discard changes before leaving.');
    this.resolvePendingDecision(true);
  }

  stayEditing(): void {
    this.demo.addLog('User chose to stay on the editor route.');
    this.resolvePendingDecision(false);
  }

  canDeactivateRoute(): PendingChangesDecision {
    if (!this.dirty()) {
      this.demo.addLog('canDeactivate allowed leaving because the editor is clean.');
      return true;
    }

    if (this.pendingDecisionPromise) {
      this.demo.addLog('canDeactivate is already waiting for the user decision.');
      return this.pendingDecisionPromise;
    }

    this.dialogOpen.set(true);
    this.demo.addLog(
      'canDeactivate paused navigation because the editor has unsaved changes.',
    );

    this.pendingDecisionPromise = new Promise<boolean>((resolve) => {
      this.pendingDecision = resolve;
    });

    return this.pendingDecisionPromise;
  }

  private resolvePendingDecision(canLeave: boolean): void {
    this.dialogOpen.set(false);

    const resolve = this.pendingDecision;
    this.pendingDecision = undefined;
    this.pendingDecisionPromise = undefined;
    resolve?.(canLeave);
  }
}

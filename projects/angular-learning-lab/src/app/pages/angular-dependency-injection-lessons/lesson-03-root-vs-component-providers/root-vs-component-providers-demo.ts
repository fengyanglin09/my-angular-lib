import { Component, inject, Injectable, signal } from '@angular/core';

type DraftMode = 'shared' | 'isolated';

@Injectable()
class EditorDraftService {
  readonly instanceId = Math.floor(Math.random() * 9000) + 1000;
  readonly title = signal('Untitled project');

  setTitle(title: string): void {
    this.title.set(title);
  }
}

@Component({
  selector: 'app-shared-editor-card-demo',
  template: `
    <article class="editor-card">
      <p class="eyebrow">{{ name }}</p>
      <h3>Draft service #{{ draft.instanceId }}</h3>
      <p>{{ draft.title() }}</p>
      <button type="button" (click)="draft.setTitle(name + ' changed draft')">
        Edit draft
      </button>
    </article>
  `,
})
class SharedEditorCardDemo {
  readonly draft = inject(EditorDraftService);
  name = 'Editor';
}

@Component({
  selector: 'app-shared-editor-region-demo',
  providers: [EditorDraftService],
  imports: [SharedEditorCardDemo],
  template: `
    <div class="demo-grid">
      <app-shared-editor-card-demo />
      <app-shared-editor-card-demo />
    </div>
  `,
})
class SharedEditorRegionDemo {}

@Component({
  selector: 'app-isolated-editor-card-demo',
  providers: [EditorDraftService],
  template: `
    <article class="editor-card">
      <p class="eyebrow">Component provider</p>
      <h3>Draft service #{{ draft.instanceId }}</h3>
      <p>{{ draft.title() }}</p>
      <button
        type="button"
        (click)="draft.setTitle('Local editor changed draft')"
      >
        Edit draft
      </button>
    </article>
  `,
})
class IsolatedEditorCardDemo {
  protected readonly draft = inject(EditorDraftService);
}

@Component({
  selector: 'app-isolated-editor-region-demo',
  imports: [IsolatedEditorCardDemo],
  template: `
    <div class="demo-grid">
      <app-isolated-editor-card-demo />
      <app-isolated-editor-card-demo />
    </div>
  `,
})
class IsolatedEditorRegionDemo {}

@Component({
  selector: 'app-root-vs-component-providers-demo',
  imports: [IsolatedEditorRegionDemo, SharedEditorRegionDemo],
  templateUrl: './root-vs-component-providers-demo.html',
  styleUrl: './root-vs-component-providers-demo.css',
})
export class RootVsComponentProvidersDemo {
  protected readonly mode = signal<DraftMode>('shared');

  protected showShared(): void {
    this.mode.set('shared');
  }

  protected showIsolated(): void {
    this.mode.set('isolated');
  }
}

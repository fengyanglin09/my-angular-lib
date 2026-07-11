import { Component, computed, signal } from '@angular/core';

type FolderMode = 'by-type' | 'by-feature';

interface FileNode {
  folder: string;
  files: string[];
}

@Component({
  selector: 'app-feature-folders-demo',
  templateUrl: './feature-folders-demo.html',
  styleUrl: './feature-folders-demo.css',
})
export class FeatureFoldersDemo {
  protected readonly mode = signal<FolderMode>('by-type');
  protected readonly fileTree = computed<FileNode[]>(() =>
    this.mode() === 'by-type'
      ? [
          {
            folder: 'components/',
            files: ['orders-list.ts', 'orders-detail.ts', 'users-list.ts'],
          },
          {
            folder: 'services/',
            files: ['orders-api.ts', 'users-api.ts'],
          },
          {
            folder: 'models/',
            files: ['order.model.ts', 'user.model.ts'],
          },
        ]
      : [
          {
            folder: 'orders/',
            files: [
              'orders.routes.ts',
              'orders-list.page.ts',
              'orders-detail.page.ts',
              'orders-api.ts',
              'order.model.ts',
            ],
          },
          {
            folder: 'users/',
            files: ['users.routes.ts', 'users-list.page.ts', 'users-api.ts'],
          },
          {
            folder: 'shared/ui/',
            files: ['empty-state.ts', 'page-header.ts'],
          },
        ]
  );

  protected showByType(): void {
    this.mode.set('by-type');
  }

  protected showByFeature(): void {
    this.mode.set('by-feature');
  }
}

import { Component, Pipe, PipeTransform, signal } from '@angular/core';

type TruncateMode = 'ellipsis' | 'label';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number,
    mode: TruncateMode = 'ellipsis'
  ): string {
    if (value.length <= maxLength) {
      return value;
    }

    const suffix = mode === 'label' ? ' [more]' : '...';
    return `${value.slice(0, Math.max(0, maxLength - suffix.length))}${suffix}`;
  }
}

@Component({
  selector: 'app-truncate-demo',
  imports: [TruncateTextPipe],
  templateUrl: './truncate-demo.html',
  styleUrl: './truncate-demo.css',
})
export class TruncateDemo {
  protected readonly maxLength = signal(42);
  protected readonly mode = signal<TruncateMode>('ellipsis');
  protected readonly modes: TruncateMode[] = ['ellipsis', 'label'];
  protected readonly releaseNote =
    'Backend invoice exports now include audit metadata, reviewer details, and retry status for failed deliveries.';

  protected setMode(mode: TruncateMode): void {
    this.mode.set(mode);
  }

  protected shorter(): void {
    this.maxLength.update((length) => Math.max(20, length - 8));
  }

  protected longer(): void {
    this.maxLength.update((length) => Math.min(96, length + 8));
  }
}

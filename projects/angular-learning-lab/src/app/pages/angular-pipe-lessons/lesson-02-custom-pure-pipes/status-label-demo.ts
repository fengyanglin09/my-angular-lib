import { Component, Pipe, PipeTransform, signal } from '@angular/core';

type TicketStatus = 'blocked' | 'done' | 'in-review' | 'open';

const statusLabels: Record<TicketStatus, string> = {
  blocked: 'Blocked',
  done: 'Done',
  'in-review': 'In Review',
  open: 'Open',
};

@Pipe({
  name: 'statusLabel',
})
export class StatusLabelPipe implements PipeTransform {
  transform(status: TicketStatus): string {
    return statusLabels[status] ?? 'Unknown';
  }
}

@Component({
  selector: 'app-status-label-demo',
  imports: [StatusLabelPipe],
  templateUrl: './status-label-demo.html',
  styleUrl: './status-label-demo.css',
})
export class StatusLabelDemo {
  protected readonly status = signal<TicketStatus>('open');
  protected readonly statuses: TicketStatus[] = [
    'open',
    'in-review',
    'blocked',
    'done',
  ];

  protected setStatus(status: TicketStatus): void {
    this.status.set(status);
  }
}

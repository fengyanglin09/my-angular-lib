import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import {
  Component,
  Pipe,
  PipeTransform,
  computed,
  signal,
} from '@angular/core';

interface InvoiceDto {
  centsDue: number;
  customer_name: string;
  due_date_iso: string;
  invoice_status: 'FAILED_PAYMENT' | 'PAID' | 'PENDING_REVIEW';
}

const invoices: InvoiceDto[] = [
  {
    centsDue: 248900,
    customer_name: 'northwind supply',
    due_date_iso: '2026-07-15T12:00:00Z',
    invoice_status: 'PENDING_REVIEW',
  },
  {
    centsDue: 0,
    customer_name: 'contoso finance',
    due_date_iso: '2026-07-08T12:00:00Z',
    invoice_status: 'PAID',
  },
  {
    centsDue: 84550,
    customer_name: 'adventure works',
    due_date_iso: '2026-07-01T12:00:00Z',
    invoice_status: 'FAILED_PAYMENT',
  },
];

@Pipe({
  name: 'invoiceStatusLabel',
})
export class InvoiceStatusLabelPipe implements PipeTransform {
  transform(status: InvoiceDto['invoice_status']): string {
    return status
      .toLowerCase()
      .split('_')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');
  }
}

@Component({
  selector: 'app-api-formatting-demo',
  imports: [CurrencyPipe, DatePipe, InvoiceStatusLabelPipe, JsonPipe],
  templateUrl: './api-formatting-demo.html',
  styleUrl: './api-formatting-demo.css',
})
export class ApiFormattingDemo {
  protected readonly selectedIndex = signal(0);
  protected readonly invoice = computed(() => invoices[this.selectedIndex()]);
  protected readonly invoiceIndexes = invoices.map((_, index) => index);

  protected selectInvoice(index: number): void {
    this.selectedIndex.set(index);
  }

  protected amountInDollars(invoice: InvoiceDto): number {
    return invoice.centsDue / 100;
  }
}

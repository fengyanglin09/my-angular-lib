import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type TicketStatus = 'closed' | 'open';

interface SupportTicket {
  customer: string;
  id: string;
  priority: number;
  status: TicketStatus;
  title: string;
}

interface CodeExample {
  name: string;
  plain: string;
  ramda: string;
  takeaway: string;
}

const initialTickets: SupportTicket[] = [
  {
    customer: 'Northwind',
    id: 'ticket-101',
    priority: 2,
    status: 'open',
    title: 'Angular form validation fails on submit',
  },
  {
    customer: 'Contoso',
    id: 'ticket-202',
    priority: 4,
    status: 'open',
    title: 'NgRx selector returns duplicate rows',
  },
  {
    customer: 'Fabrikam',
    id: 'ticket-303',
    priority: 1,
    status: 'closed',
    title: 'RxJS polling keeps running after navigation',
  },
];

const normalizeText = R.pipe(R.trim, R.toLower);

function ticketMatchesSearch(search: string, ticket: SupportTicket): boolean {
  const normalizedSearch = normalizeText(search);

  if (normalizedSearch.length === 0) {
    return true;
  }

  return normalizeText(`${ticket.title} ${ticket.customer}`).includes(normalizedSearch);
}

function selectVisibleTickets(
  tickets: SupportTicket[],
  search: string,
  showClosed: boolean,
): SupportTicket[] {
  const visibleTickets = tickets.filter((ticket) => {
    const matchesStatus = showClosed || ticket.status === 'open';

    return matchesStatus && ticketMatchesSearch(search, ticket);
  });

  return R.sortBy((ticket: SupportTicket) => ticket.priority, visibleTickets);
}

function increasePriority(ticket: SupportTicket): SupportTicket {
  return R.assoc(
    'priority',
    Math.min(5, ticket.priority + 1),
    ticket,
  ) as SupportTicket;
}

@Component({
  selector: 'app-lesson-01-what-is-ramda',
  imports: [LearningNav],
  templateUrl: './lesson-01-what-is-ramda.html',
  styleUrl: './lesson-01-what-is-ramda.css',
})
export class Lesson01WhatIsRamda {
  protected readonly search = signal('');
  protected readonly showClosed = signal(false);
  protected readonly tickets = signal(initialTickets);

  protected readonly visibleTickets = computed(() =>
    selectVisibleTickets(this.tickets(), this.search(), this.showClosed()),
  );

  protected readonly examples: CodeExample[] = [
    {
      name: 'Normalize text',
      plain: `const normalize = (value) =>
  value.trim().toLowerCase();`,
      ramda: `const normalize = pipe(
  trim,
  toLower
);`,
      takeaway: 'Ramda favors small functions that can be composed into a readable pipeline.',
    },
    {
      name: 'Sort a list',
      plain: `return [...tickets].sort(
  (a, b) => a.priority - b.priority
);`,
      ramda: `return sortBy(
  (ticket) => ticket.priority,
  tickets
);`,
      takeaway: 'Ramda helpers usually return new values instead of mutating the original data.',
    },
    {
      name: 'Update one field',
      plain: `return {
  ...ticket,
  priority: ticket.priority + 1,
};`,
      ramda: `return assoc(
  'priority',
  ticket.priority + 1,
  ticket
);`,
      takeaway: 'Ramda can replace repetitive spread syntax for immutable object updates.',
    },
  ];

  protected boostFirstVisibleTicket(): void {
    const firstVisibleTicket = this.visibleTickets()[0];

    if (!firstVisibleTicket) {
      return;
    }

    this.tickets.update((tickets) =>
      tickets.map((ticket) =>
        ticket.id === firstVisibleTicket.id ? increasePriority(ticket) : ticket,
      ),
    );
  }

  protected reset(): void {
    this.search.set('');
    this.showClosed.set(false);
    this.tickets.set(initialTickets);
  }

  protected setSearch(search: string): void {
    this.search.set(search);
  }

  protected toggleClosedTickets(): void {
    this.showClosed.update((showClosed) => !showClosed);
  }
}

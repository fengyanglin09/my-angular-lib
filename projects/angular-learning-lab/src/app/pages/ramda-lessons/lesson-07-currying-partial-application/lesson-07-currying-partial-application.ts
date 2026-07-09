import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type CurrencyCode = 'EUR' | 'USD';
type PricingMode = 'member' | 'standard' | 'vip';

interface CartLine {
  category: 'book' | 'course' | 'tool';
  id: string;
  quantity: number;
  title: string;
  unitPrice: number;
}

interface PricedLine extends CartLine {
  discount: number;
  label: string;
  subtotal: number;
  tax: number;
  total: number;
}

interface PricingConfig {
  discountRate: number;
  label: string;
  mode: PricingMode;
  taxRate: number;
}

interface Receipt {
  auditMessage: string;
  formattedTotal: string;
  lines: PricedLine[];
  total: number;
}

interface CurriedLinePricer {
  (taxRate: number): (discountRate: number) => (line: CartLine) => PricedLine;
  (taxRate: number, discountRate: number): (line: CartLine) => PricedLine;
  (taxRate: number, discountRate: number, line: CartLine): PricedLine;
}

interface CurrencyFormatter {
  (currency: CurrencyCode): (value: number) => string;
  (currency: CurrencyCode, value: number): string;
}

interface LessonExample {
  code: string;
  description: string;
  name: string;
  output: string;
  title: string;
}

interface PlainEquivalent {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

const cartLines: CartLine[] = [
  {
    category: 'course',
    id: 'rxjs-course',
    quantity: 1,
    title: 'RxJS Deep Dive',
    unitPrice: 89,
  },
  {
    category: 'book',
    id: 'ramda-book',
    quantity: 2,
    title: 'Functional Data Notes',
    unitPrice: 32,
  },
  {
    category: 'tool',
    id: 'debugger',
    quantity: 1,
    title: 'State Debugging Toolkit',
    unitPrice: 45,
  },
];

const pricingConfigs: Record<PricingMode, PricingConfig> = {
  member: {
    discountRate: 0.1,
    label: 'Member discount',
    mode: 'member',
    taxRate: 0.0825,
  },
  standard: {
    discountRate: 0,
    label: 'Standard pricing',
    mode: 'standard',
    taxRate: 0.0825,
  },
  vip: {
    discountRate: 0.18,
    label: 'VIP discount',
    mode: 'vip',
    taxRate: 0.0825,
  },
};

const priceLine = R.curry(
  (taxRate: number, discountRate: number, line: CartLine): PricedLine => {
    const subtotal = line.unitPrice * line.quantity;
    const discount = subtotal * discountRate;
    const taxableSubtotal = subtotal - discount;
    const tax = taxableSubtotal * taxRate;
    const total = taxableSubtotal + tax;

    return {
      ...line,
      discount: roundCurrency(discount),
      label: `${line.quantity} x ${line.title}`,
      subtotal: roundCurrency(subtotal),
      tax: roundCurrency(tax),
      total: roundCurrency(total),
    };
  },
) as CurriedLinePricer;

const formatMoney = R.curry(
  (currency: CurrencyCode, value: number): string =>
    new Intl.NumberFormat('en-US', {
      currency,
      style: 'currency',
    }).format(value),
) as CurrencyFormatter;

function buildAuditMessage(action: string, mode: PricingMode, lineCount: number): string {
  return `${action}: ${lineCount} cart lines priced with ${mode} rules.`;
}

const checkoutAuditMessage = R.partial(buildAuditMessage, [
  'Checkout preview',
]) as (mode: PricingMode, lineCount: number) => string;

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-07-currying-partial-application',
  imports: [LearningNav],
  templateUrl: './lesson-07-currying-partial-application.html',
  styleUrl: './lesson-07-currying-partial-application.css',
})
export class Lesson07CurryingPartialApplication {
  protected readonly currency = signal<CurrencyCode>('USD');
  protected readonly pricingMode = signal<PricingMode>('member');

  protected readonly cartLines = cartLines;
  protected readonly currencyButtons: CurrencyCode[] = ['USD', 'EUR'];
  protected readonly pricingButtons: PricingMode[] = ['standard', 'member', 'vip'];

  protected readonly activeConfig = computed(() => pricingConfigs[this.pricingMode()]);
  protected readonly receipt = computed(() => this.buildReceipt(this.activeConfig(), this.currency()));
  protected readonly receiptJson = computed(() => pretty(this.receipt().lines));

  protected readonly examples = computed<LessonExample[]>(() => {
    const config = this.activeConfig();
    const currency = this.currency();
    const priceForMode = priceLine(config.taxRate, config.discountRate);
    const formatCurrency = formatMoney(currency);

    return [
      {
        code: `const priceLine = curry(
  (taxRate, discountRate, line) => pricedLine
);

const priceMemberLine = priceLine(0.0825, 0.1);
const priced = priceMemberLine(cartLine);`,
        description: 'Currying fills arguments from left to right, so taxRate and discountRate are configured before the cart line arrives.',
        name: 'currying',
        output: pretty(priceForMode(this.cartLines[0])),
        title: 'Pre-fill tax and discount',
      },
      {
        code: `const formatMoney = curry(
  (currency, value) => formattedValue
);

const formatUsd = formatMoney('USD');
const label = formatUsd(42);`,
        description: 'A curried formatter can become a reusable formatter for one currency.',
        name: 'formatter',
        output: formatCurrency(this.receipt().total),
        title: 'Create a configured formatter',
      },
      {
        code: `function buildAuditMessage(
  action,
  mode,
  lineCount
) {
  return message;
}

const checkoutAuditMessage = partial(
  buildAuditMessage,
  ['Checkout preview']
);

// Remaining arguments are mode and lineCount.
checkoutAuditMessage(mode, lineCount);`,
        description: 'partial works on a normal function. It pre-fills leading arguments and returns a smaller function for the rest.',
        name: 'partial',
        output: this.receipt().auditMessage,
        title: 'Pre-fill the first argument',
      },
    ];
  });

  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Pre-fill tax and discount.',
      name: 'currying',
      plain: `const priceLine =
  (taxRate, discountRate, line) => pricedLine;

const priceMemberLine =
  (line) => priceLine(0.0825, 0.1, line);`,
      ramda: `const priceLine = curry(
  (taxRate, discountRate, line) => pricedLine
);

// Arguments fill left to right:
// taxRate -> discountRate -> line.
const priceMemberLine = priceLine(0.0825, 0.1);`,
      title: 'currying',
    },
    {
      description: 'Pre-fill one named behavior.',
      name: 'partial',
      plain: `const checkoutAuditMessage =
  (mode, lineCount) =>
    buildAuditMessage(
      'Checkout preview',
      mode,
      lineCount,
    );`,
      ramda: `const checkoutAuditMessage = partial(
  buildAuditMessage,
  ['Checkout preview'],
);

// Works even though buildAuditMessage
// is not a curried function.`,
      title: 'partial',
    },
    {
      description: 'Use the configured function in a list transformation.',
      name: 'map',
      plain: `const pricedLines = cartLines.map((line) =>
  priceLine(taxRate, discountRate, line),
);`,
      ramda: `const priceForMode = priceLine(taxRate, discountRate);
const pricedLines = map(priceForMode, cartLines);`,
      title: 'mapping with a configured function',
    },
  ];

  protected buildReceipt(config: PricingConfig, currency: CurrencyCode): Receipt {
    const priceForMode = priceLine(config.taxRate, config.discountRate);
    const formatCurrency = formatMoney(currency);
    const lines = R.map(priceForMode, this.cartLines);
    const total = roundCurrency(R.sum(lines.map((line) => line.total)));

    return {
      auditMessage: checkoutAuditMessage(config.mode, lines.length),
      formattedTotal: formatCurrency(total),
      lines,
      total,
    };
  }

  protected setCurrency(currency: CurrencyCode): void {
    this.currency.set(currency);
  }

  protected setPricingMode(mode: PricingMode): void {
    this.pricingMode.set(mode);
  }
}

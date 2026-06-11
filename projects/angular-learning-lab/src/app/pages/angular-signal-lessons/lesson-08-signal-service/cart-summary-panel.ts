import { Component, inject } from '@angular/core';

import { CartSignalStore } from './cart-signal-store';

@Component({
  selector: 'app-cart-summary-panel',
  templateUrl: './cart-summary-panel.html',
  styleUrl: './cart-summary-panel.css',
})
export class CartSummaryPanel {
  protected readonly cartStore = inject(CartSignalStore);
}

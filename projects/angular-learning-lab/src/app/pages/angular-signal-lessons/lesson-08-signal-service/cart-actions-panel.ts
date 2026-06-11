import { Component, inject } from '@angular/core';

import { CartSignalStore } from './cart-signal-store';

@Component({
  selector: 'app-cart-actions-panel',
  templateUrl: './cart-actions-panel.html',
  styleUrl: './cart-actions-panel.css',
})
export class CartActionsPanel {
  protected readonly cartStore = inject(CartSignalStore);

  protected readonly products = [
    { id: 'signals-course', name: 'Signals Course', price: 49 },
    { id: 'rxjs-workshop', name: 'RxJS Workshop', price: 59 },
    { id: 'ngrx-guide', name: 'NgRx Guide', price: 39 },
  ];
}

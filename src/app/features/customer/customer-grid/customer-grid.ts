import { Component, inject } from '@angular/core';
import { AppState } from '../../../shared/state/app.state';

@Component({
  selector: 'app-customer-grid',
  imports: [],
  templateUrl: './customer-grid.html',
  styleUrl: './customer-grid.css',
})
export class CustomerGrid {
  private appState = inject(AppState);

  constructor() {
    this.appState.setTitle('Customers');
  }
}

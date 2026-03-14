import { Routes } from '@angular/router';
import { InvoiceGrid } from './features/invoice/invoice-grid/invoice-grid';
import { CustomerGrid } from './features/customer/customer-grid/customer-grid';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full',
  },
  { path: 'invoices', component: InvoiceGrid },
  { path: 'customers', component: CustomerGrid },
];

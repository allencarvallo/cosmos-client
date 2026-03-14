import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Invoice } from '../invoice.model';
import { AppState } from '../../../shared/state/app.state';

const INVOICE_LIST: Invoice[] = [
  { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
    { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
    { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
    { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
    { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
    { invoiceNumber: 'INV001', customerName: 'John Doe', date: '2024-01-01', amount: 100.0 },
  { invoiceNumber: 'INV002', customerName: 'Jane Smith', date: '2024-01-02', amount: 150.0 },
  { invoiceNumber: 'INV003', customerName: 'Bob Johnson', date: '2024-01-03', amount: 200.0 },
  
];

@Component({
  selector: 'app-invoice-grid',
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSortModule,
  ],
  templateUrl: './invoice-grid.html',
  styleUrl: './invoice-grid.css',
})
export class InvoiceGrid {
  @ViewChild(MatSort) sort!: MatSort;

  invoiceCols: string[] = ['invoiceNumber', 'customerName', 'date', 'amount'];
  invoiceList = new MatTableDataSource(INVOICE_LIST);

  private appState = inject(AppState);

  constructor() {
    this.appState.setTitle('Invoices');
  }

  ngAfterViewInit() {
    this.invoiceList.sort = this.sort;
  }

  addInvoice(): void {}
}

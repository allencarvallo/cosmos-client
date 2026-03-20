import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InvoiceListResponse } from '../invoice.model';
import { AppState } from '../../../shared/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceForm } from '../invoice-form/invoice-form';
import { MatProgressBar } from '@angular/material/progress-bar';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-grid',
  imports: [
    MatTableModule,
    MatSortModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatButton,
    MatDivider,
    MatProgressBar,
  ],
  templateUrl: './invoice-grid.html',
  styleUrl: './invoice-grid.css',
})
export class InvoiceGrid {
  @ViewChild(MatSort) sort!: MatSort;

  private appState = inject(AppState);
  private dialog = inject(MatDialog);
  private invoiceService = inject(InvoiceService);

  invoiceList = new MatTableDataSource<InvoiceListResponse>([]);
  invoiceCols: string[] = ['invoiceNumber', 'customerName', 'date', 'amount', 'actions'];
  loading = signal(false);

  constructor() {
    this.appState.setTitle('Invoices');
  }

  ngOnInit() {
    this.loading.set(true);
    this.getInvoiceList();
  }

  ngAfterViewInit() {
    this.invoiceList.sort = this.sort;
  }

  getInvoiceList(): void {
    this.invoiceService.getAll().subscribe({
      next: (data) => {
        this.invoiceList.data = data;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addInvoice(): void {
    const dialogRef = this.dialog.open(InvoiceForm, {
      width: '800px',
      maxWidth: '95vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInvoiceList();
    });
  }

  editInvoice(element: any): void {}

  deleteInvoice(invoiceId: number): void {}
}

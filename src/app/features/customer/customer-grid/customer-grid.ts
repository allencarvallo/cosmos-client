import { Component, inject, signal, ViewChild } from '@angular/core';
import { AppState } from '../../../shared/state/app.state';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { CustomerResponse } from '../customer.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomerForm } from '../customer-form/customer-form';

@Component({
  selector: 'app-customer-grid',
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
  templateUrl: './customer-grid.html',
  styleUrl: './customer-grid.css',
})
export class CustomerGrid {
  @ViewChild(MatSort) sort!: MatSort;

  private customerService = inject(CustomerService);
  private appState = inject(AppState);
  private dialog = inject(MatDialog);

  customerList = new MatTableDataSource<CustomerResponse>([]);
  customerCols: string[] = ['name', 'phone', 'email', 'description', 'actions'];
  loading = signal(false);

  constructor() {
    this.appState.setTitle('Customers');
  }

  ngOnInit() {
    this.loading.set(true);
    this.getCustomerList();
  }

  ngAfterViewInit() {
    this.customerList.sort = this.sort;
  }

  getCustomerList(): void {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customerList.data = data;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addCustomer(): void {
    const dialogRef = this.dialog.open(CustomerForm, {
      width: '560px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCustomerList();
    });
  }

  editCustomer(element: any): void {}

  deleteCustomer(customerId: number): void {}
}

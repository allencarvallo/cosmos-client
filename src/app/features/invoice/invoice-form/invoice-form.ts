import { Component, Inject, inject, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceService } from '../invoice.service';
import { CustomerService } from '../../customer/customer.service';
import { CustomerResponse } from '../../customer/customer.model';
import {
  CreateInvoiceItemRequest,
  CreateInvoiceRequest,
  InvoiceFormModel,
  InvoiceItemFormModel,
} from '../invoice.model';
import { ToastService } from '../../../shared/services/toast.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-invoice-form',
  imports: [
    FormField,
    FormField,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatIconButton,
    MatIcon,
    MatDivider,
    MatProgressSpinner,
    MatSelectModule,
    MatProgressBar,
    MatDatepickerModule,
  ],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.css',
})
export class InvoiceForm {
  private dialogRef = inject(MatDialogRef<InvoiceForm>);
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerService);
  private toastService = inject(ToastService);

  customers = signal<CustomerResponse[]>([]);
  saving = signal(false);
  loading = signal(false);

  invoiceModel = signal<InvoiceFormModel>({
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceAmount: 0,
    customerId: 0,
  });

  invoiceItems = signal<InvoiceItemFormModel[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 },
  ]);

  invoiceForm = form(this.invoiceModel, (path) => {
    required(path.invoiceDate, { message: 'Invoice date is required' });
    required(path.customerId, { message: 'Customer is required' });
    min(path.invoiceAmount, 0.01, { message: 'Amount must be greater than 0' });
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { invoiceId: number } | null) {}

  get isEditMode(): boolean {
    return !!this.data?.invoiceId;
  }

  ngOnInit() {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers.set(data),
    });

    if (this.isEditMode) {
      this.loadInvoice(this.data!.invoiceId);
    }
  }

  private loadInvoice(invoiceId: number) {
    this.loading.set(true);
    this.invoiceService.getById(invoiceId).subscribe({
      next: (invoice) => {
        this.invoiceModel.set({
          invoiceDate: invoice.invoiceDate,
          invoiceAmount: invoice.invoiceAmount,
          customerId: invoice.customerId,
        });
        this.invoiceItems.set(
          invoice.invoiceItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            amount: item.amount,
          })),
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addItem() {
    this.invoiceItems.update((items) => [
      ...items,
      { description: '', quantity: 1, rate: 0, amount: 0 },
    ]);
  }

  removeItem(index: number) {
    this.invoiceItems.update((items) => items.filter((_, i) => i !== index));
    this.recalculateTotal();
  }

  updateItem(index: number, field: keyof InvoiceItemFormModel, value: string | number) {
    this.invoiceItems.update((items) => {
      const updated = [...items];
      updated[index] = { ...updated[index], [field]: value };
      if (field === 'quantity' || field === 'rate') {
        updated[index].amount = updated[index].quantity * updated[index].rate;
      }
      return updated;
    });
    this.recalculateTotal();
  }

  private recalculateTotal() {
    const total = this.invoiceItems().reduce((sum, item) => sum + item.amount, 0);
    this.invoiceModel.update((m) => ({ ...m, invoiceAmount: total }));
  }

  save() {
    if (this.invoiceForm().invalid()) return;
    if (this.invoiceItems().length === 0) return;

    const model = this.invoiceModel();
    const req: CreateInvoiceRequest = {
      invoiceDate: model.invoiceDate,
      invoiceAmount: model.invoiceAmount,
      customerId: model.customerId,
      invoiceItems: this.invoiceItems() as CreateInvoiceItemRequest[],
    };

    this.saving.set(true);

    const operation$ = this.isEditMode
      ? this.invoiceService.update(this.data!.invoiceId, req)
      : this.invoiceService.create(req);

    operation$.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.toastService.success(
            this.isEditMode ? 'Successfully updated' : 'Successfully added',
          );
        }
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: () => this.saving.set(false),
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

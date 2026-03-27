import { Component, Inject, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { email, form, FormField, maxLength, required } from '@angular/forms/signals';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CreateCustomerRequest, CustomerFormModel } from '../customer.model';
import { ToastService } from '../../../shared/services/toast.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-customer-form',
  imports: [
    FormField,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatProgressSpinner,
    MatProgressBar,
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  private dialogRef = inject(MatDialogRef<CustomerForm>);
  private customerService = inject(CustomerService);
  private toastService = inject(ToastService);

  saving = signal(false);
  loading = signal(false);

  customerModel = signal<CustomerFormModel>({
    name: '',
    phone: '',
    email: '',
    address: '',
    description: '',
  });

  customerForm = form(this.customerModel, (path) => {
    required(path.name, { message: 'Name is required' });
    maxLength(path.name, 100, { message: 'Name cannot exceed 100 characters' });
    maxLength(path.phone, 20, { message: 'Phone cannot exceed 20 characters' });
    email(path.email, { message: 'Enter a valid email address' });
    maxLength(path.email, 100, { message: 'Email cannot exceed 100 characters' });
    maxLength(path.address, 500, { message: 'Address exceed 500 characters' });
    maxLength(path.description, 500, { message: 'Description cannot exceed 500 characters' });
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { customerId: number } | null) {}

  get isEditMode(): boolean {
    return !!this.data?.customerId;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.loadCustomer(this.data!.customerId);
    }
  }

  private loadCustomer(customerId: number): void {
    this.loading.set(true);
    this.customerService.getById(customerId).subscribe({
      next: (customer) => {
        this.customerModel.set({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          description: customer.description,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  save() {
    if (!this.customerForm().valid) return;

    const model = this.customerModel();
    const req: CreateCustomerRequest = {
      name: model.name,
      phone: model.phone,
      email: model.email,
      address: model.address,
      description: model.description,
    };

    this.saving.set(true);

    const operation$ = this.isEditMode
      ? this.customerService.update(this.data!.customerId, req)
      : this.customerService.create(req);

    operation$.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.toastService.success(
            this.isEditMode ? 'Successfully updated' : 'Successfully added',
          );
        }
        this.saving.set(false);
        this.dialogRef.close();
      },
      error: () => this.saving.set(false),
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

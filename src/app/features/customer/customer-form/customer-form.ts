import { Component, inject, signal } from '@angular/core';
import {
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
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  private dialogRef = inject(MatDialogRef<CustomerForm>);
  private customerService = inject(CustomerService);

  saving = signal(false);

  customerModel = signal<CustomerFormModel>({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  customerForm = form(this.customerModel, (path) => {
    required(path.name, { message: 'Name is required' });
    maxLength(path.name, 100, { message: 'Name cannot exceed 100 characters' });
    maxLength(path.phone, 20, { message: 'Phone cannot exceed 20 characters' });
    email(path.email, { message: 'Enter a valid email address' });
    maxLength(path.email, 100, { message: 'Email cannot exceed 100 characters' });
    maxLength(path.description, 500, { message: 'Description cannot exceed 500 characters' });
  });

  save() {
    if (!this.customerForm().valid) return;

    const model = this.customerModel();
    const req: CreateCustomerRequest = {
      name: model.name,
      phone: model.phone,
      email: model.email,
      description: model.description,
    };

    this.saving.set(true);
    this.customerService.create(req).subscribe({
      next: (customer) => {
        this.saving.set(false);
        this.dialogRef.close(customer);
      },
      error: () => this.saving.set(false),
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

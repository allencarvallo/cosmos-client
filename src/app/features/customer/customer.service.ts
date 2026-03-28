import { inject, Injectable } from '@angular/core';
import { HttpBaseService } from '../../core/services/http-base.service';
import { CreateCustomerRequest, CustomerResponse } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpBaseService);

  getAll() {
    return this.http.get<CustomerResponse[]>('customers');
  }

  getById(customerId: number) {
    return this.http.get<CustomerResponse>(`customers/${customerId}`);
  }

  create(req: CreateCustomerRequest) {
    return this.http.post<boolean>('customers', req);
  }

  update(customerId: number, req: CreateCustomerRequest) {
    return this.http.put<boolean>(`customers/${customerId}`, req);
  }

  delete(customerId: number) {
    return this.http.delete<boolean>(`customers/${customerId}`);
  }
}

import { inject, Injectable } from '@angular/core';
import { CreateInvoiceRequest, InvoiceListResponse, InvoiceResponse } from './invoice.model';
import { HttpBaseService } from '../../core/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpBaseService);

  getAll() {
    return this.http.get<InvoiceListResponse[]>('invoices');
  }

  getById(invoiceId: number) {
    return this.http.get<InvoiceResponse>(`invoices/${invoiceId}`);
  }

  create(req: CreateInvoiceRequest) {
    return this.http.post<InvoiceResponse>('invoices', req);
  }

  update(invoiceId: number, req: CreateInvoiceRequest) {
    return this.http.put<InvoiceResponse>(`invoices/${invoiceId}`, req);
  }

  delete(invoiceId: number) {
    return this.http.delete(`invoices/${invoiceId}`);
  }

  downloadPdf(invoiceId: number) {
    return this.http.getBlob(`invoices/${invoiceId}/pdf`);
  }
}

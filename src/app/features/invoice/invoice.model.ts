export interface InvoiceListResponse {
  invoiceId: number;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: number;
  customerName: string;
}

export interface InvoiceResponse extends InvoiceListResponse {
  customerId: number;
  invoiceItems: InvoiceItemResponse[];
}

export interface InvoiceItemResponse {
  invoiceItemId: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CreateInvoiceRequest {
  invoiceDate: string;
  invoiceAmount: number;
  customerId: number;
  invoiceItems: CreateInvoiceItemRequest[];
}

export interface CreateInvoiceItemRequest {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceFormModel {
  invoiceDate: string;
  invoiceAmount: number;
  customerId: number;
}

export interface InvoiceItemFormModel {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

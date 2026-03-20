export interface CustomerResponse {
  customerId: number;
  name: string;
  phone: string;
  email: string;
  description: string;
}

export interface CreateCustomerRequest {
  name: string;
  phone: string;
  email: string;
  description: string;
}

export interface CustomerFormModel {
  name: string;
  phone: string;
  email: string;
  description: string;
}
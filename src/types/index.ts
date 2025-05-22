export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  token: string;
}

export interface Order {
  id: number;
  document: string;
  version: string;
  type: string;
  branch: string;
  branchDescription: string;
  status: string;
  barcode: string;
  digcode: string;
  date: string;
  paymentDate: string;
  amount: number;
  product: string;
  balance: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  branch: string;
  document: string;
  version: string;
  product: string;
  description: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface PaymentTypes {
  code: string;
  description: string;
}

export interface Period {
  code: string;
  description: string;
}

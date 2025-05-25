import OrderContent from '@/components/order';

export interface Cd {
  code: string;
  description: string;
}

export interface Order {
  days: Cd[];
  types: Cd[];
  status: Cd[];
  content: OrderContent[];
  elements: number;
  totalElements: number;
  page: number;
  totalPages: number;
}

export interface OrderContent {
  id: number;
  branch: string;
  branchDescription: string;
  document: string;
  version: string;
  type: string;
  barcode: string;
  digcode: string;
  date: string;
  invoiceDate: string;
  invoiceWorkingDate: string;
  paymentDate: string;
  amount: number;
  product: string;
  quantity: number;
  balance: number;
  status: string;
  image: string;
  items?: OrderItem;
}

export interface OrderItem {
  content: OrderItemContent[];
  totalElements: number;
}

export interface OrderItemContent {
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

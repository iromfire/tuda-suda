export interface Order {
  id: string;
  from: string;
  to: string;
  date: Date;
  clientName: string;
  phoneNumber: string;
  comment: string;
  total: number;
}

export interface OrderForm {
  date: Date;
  clientName: string;
  phoneNumber: string;
  comment: string;
}

import { Time } from '@angular/common';
import { OrderStatus } from '../enums/enums';

export interface Order {
  dateOrder: Date;
  id?: string;
  orderNumber: string;
  from: string;
  to: string;
  date: Date;
  time: Time;
  clientName: string;
  phoneNumber: string;
  comment: string;
  email: string;
  loader: string;
  total: number;
  status: OrderStatus;
}

export interface OrderForm {
  date: Date;
  time: Time;
  clientName: string;
  phoneNumber: string;
  comment: string;
}

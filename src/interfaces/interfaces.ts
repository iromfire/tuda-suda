import { Time } from '@angular/common';

export interface Order {
  id: string;
  orderNumber: string;
  from: string;
  to: string;
  date: Date;
  time: Time;
  clientName: string;
  phoneNumber: string;
  comment: string;
  total: number;
}

export interface OrderForm {
  date: Date;
  time: Time;
  clientName: string;
  phoneNumber: string;
  comment: string;
}

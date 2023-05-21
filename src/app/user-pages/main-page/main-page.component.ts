import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as generateID } from 'uuid';
import { environment } from '../../../environments/environment';
import { Order, OrderForm } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { OrderStatus } from '../../../enums/enums';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private http: HttpClient, private router: Router) {}

  from!: string;
  to!: string;
  date!: Date;
  clientName!: string;
  phoneNumber!: string;
  comment!: string;
  total!: number;
  time!: Time;

  errorExist = false;

  getOrderForm(data: OrderForm): void {
    this.date = data.date;
    this.time = data.time;
    this.clientName = data.clientName;
    this.phoneNumber = data.phoneNumber;
    this.comment = data.comment;
  }

  getAddresses(addresses: any): void {
    [this.from, this.to] = addresses;
  }

  getTotal(total: number): void {
    this.total = total;
  }

  checkForm(): boolean {
    return !!(
      this.date &&
      this.time &&
      this.clientName &&
      this.phoneNumber &&
      this.total
    );
  }

  submit(): void {
    if (this.checkForm()) {
      const uniqueId: string = generateID();
      const order: Order = {
        orderNumber: uniqueId,
        from: this.from,
        to: this.to,
        date: this.date,
        time: this.time,
        clientName: this.clientName,
        phoneNumber: this.phoneNumber,
        comment: this.comment,
        total: this.total,
        status: OrderStatus.inProcessing,
      };

      this.http
        .post(`${environment.firebaseConfig.databaseURL}/orders.json`, order)
        .subscribe(() => {
          this.router.navigateByUrl('/success_order', { state: order }).then();
        });
    } else {
      this.errorExist = true;
    }
  }
}

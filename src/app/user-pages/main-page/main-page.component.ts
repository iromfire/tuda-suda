import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as generateID } from 'uuid';
import { firebaseConfig } from '../../../environments/environment';
import { OrderForm } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

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

  getOrderForm(data: OrderForm) {
    this.date = data.date;
    this.time = data.time;
    this.clientName = data.clientName;
    this.phoneNumber = data.phoneNumber;
    this.comment = data.comment;
  }

  getTotal(total: number) {
    this.total = total;
  }

  checkForm() {
    return !!(
      this.date &&
      this.time &&
      this.clientName &&
      this.phoneNumber &&
      this.comment &&
      this.total
    );
  }

  submit() {
    if (this.checkForm()) {
      const uniqueId = generateID();
      const order = {
        orderNumber: uniqueId,
        from: 'point1',
        to: 'point2',
        date: this.date,
        time: this.time,
        clientName: this.clientName,
        phoneNumber: this.phoneNumber,
        comment: this.comment,
        total: this.total,
      };
      this.http
        .post(`${firebaseConfig.databaseURL}/orders.json`, order)
        .subscribe(() => {
          this.router.navigate(['/success_order']).then();
        });
    } else {
      this.errorExist = true;
    }
  }
}

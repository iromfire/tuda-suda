import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import emailjs from '@emailjs/browser';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http
      .get(`${environment.firebaseConfig.databaseURL}/orders.json`)
      .pipe(
        map((res: any) => {
          return Object.keys(res).map(
            (key) =>
              ({
                ...res[key],
                id: key,
              } as Order)
          );
        })
      );
  }

  updateOrderStatus(id: string, order: Order) {
    return this.http.patch(
      `${environment.firebaseConfig.databaseURL}/orders/${id}.json`,
      order
    );
  }

  deleteOrder(id: string) {
    return this.http.delete(
      `${environment.firebaseConfig.databaseURL}/orders/${id}.json`
    );
  }

  sendEmailOrderNumber(
    orderNumber: string,
    email: string,
    total: number,
    from: string,
    to: string,
    date: string,
    time: Time
  ) {
    const templateParams = {
      orderNumber: orderNumber,
      email: email,
      total: total,
      from: from,
      to: to,
      date: date,
      time: time,
    };

    emailjs
      .send(
        'service_bzbq3s9',
        'template_7pgsaa1',
        templateParams,
        'pOVIPy_RBarUAi-vI'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
  }
}

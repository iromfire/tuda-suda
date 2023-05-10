import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  updateOrderStatus(id: string, order: Order) {
    return this.http
      .patch(
        `${environment.firebaseConfig.databaseURL}/orders/${id}.json`,
        order
      )
      .subscribe(() => {
        console.log(order);
      });
  }
}

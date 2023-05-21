import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Order } from '../../../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { OrderStatus } from '../../../enums/enums';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-list-orders-page',
  templateUrl: './list-orders-page.component.html',
  styleUrls: ['./list-orders-page.component.scss'],
})
export class ListOrdersPageComponent implements OnInit, OnDestroy {
  orderStatuses = Object.values(OrderStatus);
  orderStatus!: OrderStatus;
  orders: Order[] = [];
  order!: Order;
  subscribe!: Subscription;
  dataSource!: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'id',
    'from',
    'to',
    'date',
    'clientName',
    'phoneNumber',
    'comment',
    'total',
    'status',
    'delete',
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private orderServ: OrderService
  ) {}

  ngOnInit() {
    this.subscribe = this.getOrders().subscribe((orders) => {
      this.orders = orders as Order[];
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected out() {
    this.auth.logout();
  }

  changeStatus(id: string, status: OrderStatus) {
    this.orderStatus = status;
    this.orderServ.updateOrderStatus(id, {
      ...this.order,
      status: this.orderStatus,
    });
  }

  public deleteOrder(id: string) {
    this.http
      .delete(`${environment.firebaseConfig.databaseURL}/orders/${id}.json`)
      .subscribe(() => {
        this.orders = this.orders.filter((orders) => orders.id != id);
      });
  }

  private getOrders() {
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
}

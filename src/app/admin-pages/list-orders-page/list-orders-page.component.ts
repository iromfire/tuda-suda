import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
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
  orderStatuses: OrderStatus[] = Object.values(OrderStatus);
  orderStatus!: OrderStatus;
  order!: Order;
  orders: Order[] = [];
  subscribe!: Subscription;
  dataSource!: MatTableDataSource<Order>;
  check!: Observable<Order[]>;
  displayedColumns: string[] = [
    'dateOrder',
    'orderNumber',
    'from',
    'to',
    'date',
    'clientName',
    'phoneNumber',
    'email',
    'comment',
    'total',
    'loader',
    'status',
    'delete',
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private orderServ: OrderService
  ) {}

  ngOnInit(): void {
    this.subscribe = this.orderServ.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders as Order[];
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  out(): void {
    this.auth.logout();
  }

  sort(option: string): void {
    let sortedOrders = [];
    switch (option) {
      case 'Очистить сортировку': {
        this.ngOnInit();
        break;
      }
      case 'Сначала ранние': {
        sortedOrders = this.orders.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.dataSource = new MatTableDataSource(sortedOrders);
        break;
      }
      case 'Сначала поздние': {
        sortedOrders = this.orders.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.dataSource = new MatTableDataSource(sortedOrders);
        break;
      }
      case 'Сначала дешевые': {
        sortedOrders = this.orders.sort((a, b) => a.total - b.total);
        this.dataSource = new MatTableDataSource(sortedOrders);
        break;
      }
      case 'Сначала дорогие': {
        sortedOrders = this.orders.sort((a, b) => b.total - a.total);
        this.dataSource = new MatTableDataSource(sortedOrders);
        break;
      }
    }
  }

  statusFilter(status: string) {
    let filteredOrders = this.orders.filter((order) => order.status == status);
    if (status === 'Очистить фильтрацию') {
      filteredOrders = this.orders;
    }
    this.dataSource = new MatTableDataSource(filteredOrders);
  }

  changeStatus(id: string, status: OrderStatus): void {
    this.orderStatus = status;
    this.orderServ
      .updateOrderStatus(id, {
        ...this.order,
        status: this.orderStatus,
      })
      .subscribe();
  }

  deleteOrder(id: string): void {
    let confirmDelete = confirm('Вы действительно хотите удалить заказ?');
    if (confirmDelete) {
      this.orderServ.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter((orders: Order) => orders.id != id);
        this.dataSource = new MatTableDataSource(this.orders);
      });
    }
  }
}

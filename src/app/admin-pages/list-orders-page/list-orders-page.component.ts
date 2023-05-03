import { Component, OnDestroy, OnInit } from '@angular/core';
import { firebaseConfig } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Order } from '../../../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-orders-page',
  templateUrl: './list-orders-page.component.html',
  styleUrls: ['./list-orders-page.component.scss'],
})
export class ListOrdersPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscribe!: Subscription;
  dataSource!: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'id',
    'date',
    'clientName',
    'phoneNumber',
    'comment',
  ];

  constructor(private http: HttpClient) {}

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

  private getOrders() {
    return this.http.get(`${firebaseConfig.databaseURL}/orders.json`).pipe(
      map((res: any) => {
        return Object.keys(res).map(
          (key) =>
            ({
              ...res[key],
            } as Order)
        );
      })
    );
  }
}
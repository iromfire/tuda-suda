import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as generateID } from 'uuid';
import { environment } from '../../../environments/environment';
import { Order, OrderForm } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { OrderLoader, OrderStatus } from '../../../enums/enums';

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
  totalWithLoaders!: number;
  time!: Time;
  orderLoader: string[] = Object.values(OrderLoader);
  loader!: string;

  errorExist = false;

  changeLoader(loader: string) {
    this.totalWithLoaders = this.total;
    if (this.totalWithLoaders) {
      switch (loader) {
        case 'Один': {
          this.totalWithLoaders += 400;
          this.loader = loader;
          break;
        }
        case 'Два': {
          this.totalWithLoaders += 800;
          this.loader = loader;
          break;
        }
        case 'Три': {
          this.totalWithLoaders += 1200;
          this.loader = loader;
          break;
        }
        case 'Не требуется': {
          this.loader = loader;
          break;
        }
      }
    }
  }

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
    this.totalWithLoaders = this.total;
  }

  checkForm(): boolean {
    return !!(
      this.from &&
      this.to &&
      this.date &&
      this.time &&
      this.clientName &&
      this.phoneNumber &&
      this.total &&
      this.loader
    );
  }

  submit(): void {
    if (this.checkForm()) {
      const uniqueId: string = generateID();
      const order: Order = {
        dateOrder: new Date(),
        orderNumber: uniqueId,
        from: this.from,
        to: this.to,
        date: this.date,
        time: this.time,
        clientName: this.clientName,
        phoneNumber: this.phoneNumber,
        comment: this.comment,
        total: this.totalWithLoaders,
        status: OrderStatus.inProcessing,
        loader: this.loader,
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

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as generateID } from 'uuid';
import { environment } from '../../../environments/environment';
import { Order, OrderForm } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { OrderLoader, OrderStatus } from '../../../enums/enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  formGroup: FormGroup;

  from!: string;
  to!: string;

  total!: number;
  totalWithLoaders!: number;

  orderLoader: string[] = Object.values(OrderLoader);
  minDate: Date;

  constructor(
    private http: HttpClient,
    private router: Router,
    private orderServ: OrderService
  ) {
    this.minDate = new Date();
    this.formGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      comment: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      loader: new FormControl('', Validators.required),
    });
  }

  changeLoader(loader: string) {
    this.totalWithLoaders = this.total;
    if (this.totalWithLoaders) {
      switch (loader) {
        case 'Один': {
          this.totalWithLoaders += 400;
          break;
        }
        case 'Два': {
          this.totalWithLoaders += 800;
          break;
        }
        case 'Три': {
          this.totalWithLoaders += 1200;
          break;
        }
        case 'Не требуется': {
          break;
        }
      }
    }
  }

  getAddresses(addresses: any): void {
    [this.from, this.to] = addresses;
  }

  getTotal(total: number): void {
    this.total = total;
    this.totalWithLoaders = this.total;
  }

  submit(): void {
    const uniqueId: string = generateID();
    const order: Order = {
      dateOrder: new Date(),
      orderNumber: uniqueId,
      from: this.from,
      to: this.to,
      date: this.formGroup.value.date,
      time: this.formGroup.value.time,
      clientName: this.formGroup.value.clientName,
      phoneNumber: this.formGroup.value.phoneNumber,
      comment: this.formGroup.value.comment,
      email: this.formGroup.value.email,
      loader: this.formGroup.value.loader,
      total: this.totalWithLoaders,
      status: OrderStatus.inProcessing,
    };
    this.http
      .post(`${environment.firebaseConfig.databaseURL}/orders.json`, order)
      .subscribe(() => {
        this.orderServ.sendEmailOrderNumber(
          order.orderNumber,
          order.email,
          order.total,
          order.from,
          order.to,
          order.date.toLocaleDateString('ru-RU'),
          order.time
        );
        this.router.navigateByUrl('/success_order', { state: order }).then();
      });
  }
}

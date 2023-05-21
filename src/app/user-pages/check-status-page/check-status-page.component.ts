import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-check-status-page',
  templateUrl: './check-status-page.component.html',
  styleUrls: ['./check-status-page.component.scss'],
})
export class CheckStatusPageComponent {
  formGroup: FormGroup;
  checkSubmit: boolean = false;
  errorExist = false;
  id: string = '';
  status!: any;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.formGroup = new FormGroup({
      orderNumber: new FormControl(''),
    });
  }

  check(): void {
    this.checkSubmit = true;
    const orderNumber = this.formGroup.get('orderNumber')!.value;
    this.db
      .list('orders', (ref: any) =>
        ref.orderByChild('orderNumber').equalTo(orderNumber)
      )
      .valueChanges()
      .subscribe((orders: any[]) => {
        if (orders.length > 0) {
          const orderId = Object.keys(orders[0])[6];
          this.status = orders[0][orderId];
        } else {
          this.errorExist = true;
        }
      });
  }
}

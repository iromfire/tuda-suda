import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Order } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  order: Order;
  constructor(private router: Router) {
    this.order = router.getCurrentNavigation()!.extras.state as Order;
  }
  ngOnInit(): void {}
}

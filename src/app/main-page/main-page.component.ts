import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  form = {
    total: 0,
    date: new Date(),
    number: '',
    comment: '',
    to: '',
    from: '',
    name: '',
  }

  // submit() {
  //   this.api.createOrder(this.form);
  // }
}

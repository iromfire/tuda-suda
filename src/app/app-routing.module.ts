import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './user-pages/order-page/order-page.component';
import { NotFoundPageComponent } from './user-pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './user-pages/main-page/main-page.component';
import { ListOrdersPageComponent } from './admin-pages/list-orders-page/list-orders-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'success_order', component: OrderPageComponent },
  { path: 'admin/orders', component: ListOrdersPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

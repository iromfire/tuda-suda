import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'order', component: OrderPageComponent},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './material-components/datepicker/datepicker.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderPageComponent } from './order-page/order-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {NgOptimizedImage} from "@angular/common";
import {OrderFormComponent} from "./main-page/components/order-form/order-form.component";
import {MainFormComponent} from "./main-page/components/main-form/main-form.component";
import {MapFormComponent} from "./main-page/components/map-form/map-form.component";


const mapConfig: YaConfig = {
  apikey: 'd9372196-27a2-4ae5-a99b-d4cc91c95fd5',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    OrderPageComponent,
    NotFoundPageComponent,
    MainPageComponent,
    OrderFormComponent,
    MainFormComponent,
    MapFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

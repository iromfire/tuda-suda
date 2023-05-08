import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from './user-pages/order-page/order-page.component';
import { NotFoundPageComponent } from './user-pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './user-pages/main-page/main-page.component';
import { NgOptimizedImage } from '@angular/common';
import { MainFormComponent } from './user-pages/main-page/components/main-form/main-form.component';
import { MapFormComponent } from './user-pages/main-page/components/map-form/map-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ListOrdersPageComponent } from './admin-pages/list-orders-page/list-orders-page.component';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AboutPageComponent } from './user-pages/about-page/about-page.component';
import { LoginPageComponent } from './admin-pages/login-page/login-page.component';
import { AuthService } from './auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

registerLocaleData(localeRu, 'ru');

const mapConfig: YaConfig = {
  apikey: 'd9372196-27a2-4ae5-a99b-d4cc91c95fd5',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    OrderPageComponent,
    NotFoundPageComponent,
    MainPageComponent,
    MainFormComponent,
    MapFormComponent,
    ListOrdersPageComponent,
    AboutPageComponent,
    LoginPageComponent,
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
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AngularFireAuthGuardModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    [provideNgxMask()],
    [AuthService],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

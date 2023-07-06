import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { loginComponent } from './login/login.component';
import { createpdfComponent } from './createPDF/createpdf.component';
//import { ToastrModule } from 'ngx-toastr';
import { toastComponent } from 'src/app/ui/toast.component'
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { ExpenseComponent } from './Expense/expense.component';
import {chatGPTComponent } from './chatGPT/chatgpt.component'


export function tokenGetter() { 
  var token=JSON.parse(localStorage.getItem('token')).token
  return token
}
@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    PaymentDetailFormComponent,
    loginComponent,
    createpdfComponent,
    ExpenseComponent,
    chatGPTComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ["localhost:4200"],
        whitelistedDomains:["localhost:5001"],
           blacklistedRoutes: []
      }
    })
  ],
  providers: [
  AuthGuard
    ,
    {provide: APP_BASE_HREF, useValue: '/'},
  DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }


 
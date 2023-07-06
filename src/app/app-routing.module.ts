import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { loginComponent} from './login/login.component'
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form.component';
import { createpdfComponent } from './createPDF/createpdf.component';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';

import { ExpenseComponent } from './Expense/expense.component';


// const routes: Routes = [
//   // { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path:  'Login', component:  loginComponent}
  
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
// import { LayoutComponent } from './layout.component';
// import { ListComponent } from './list.component';
// import { AddEditComponent } from './add-edit.component';

const routes: Routes = 

[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: loginComponent },
  { path: 'create', component: createpdfComponent },

  { path: 'detail', component: PaymentDetailsComponent, canActivate: [AuthGuard]  },
 // { path: 'detail', component: PaymentDetailsComponent  },

  { path: 'status', component: PaymentDetailFormComponent },
  { path: 'expense', component: ExpenseComponent },


];

@NgModule({
   // imports: [RouterModule.forChild(routes)],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[
      AuthGuard
  ],
})
export class AppRoutingModule { }



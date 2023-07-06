import { Component } from '@angular/core';
import { User } from './model/user';
import { AuthGuard } from './gaurds/auth.gaurd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthGuard  
    ],
})
export class AppComponent {
  
  
  user?: User | null;
  
}

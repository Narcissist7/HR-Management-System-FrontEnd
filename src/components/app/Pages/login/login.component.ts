import { Component } from '@angular/core';
import { User } from '../../../../Model/User/user';
import { RegistrationOneComponent } from '../registration/registration-one/registration-one.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegistrationOneComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginView: boolean = false;
  user: User = new User();

}

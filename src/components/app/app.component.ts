import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Pages/login/login.component";
import {RegistrationTwoComponent} from './Pages/registration/registration-two/registration-two.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegistrationTwoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngHR_OCR_Spring';

}


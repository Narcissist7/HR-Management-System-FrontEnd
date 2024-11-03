import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Pages/login/login.component";
import {RegistrationTwoComponent} from './Pages/registration/registration-two/registration-two.component';
import { JobListComponent } from "./Pages/Admin-Job-view/admin-job-view.component";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegistrationTwoComponent, JobListComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngHR_OCR_Spring';

}


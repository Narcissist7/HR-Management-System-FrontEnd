import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Pages/login/login.component";
import {CandidateComponent} from './Pages/registration/candidate/candidate.component';

import { HttpClientModule } from '@angular/common/http';
import {HomeComponent} from './Pages/home/home.component';
import {ToastModule} from 'primeng/toast';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CandidateComponent, HttpClientModule, HomeComponent , ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngHR_OCR_Spring';

}


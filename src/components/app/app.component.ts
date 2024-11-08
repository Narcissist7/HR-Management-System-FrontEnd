import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Pages/login/login.component";
import {CandidateComponent} from './Pages/registration/candidate/candidate.component';
import { JobListComponent } from "./Pages/Admin-Job-view/admin-job-view.component";
import { HttpClientModule } from '@angular/common/http';
import {HomeComponent} from './Pages/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CandidateComponent, JobListComponent, HttpClientModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngHR_OCR_Spring';

}


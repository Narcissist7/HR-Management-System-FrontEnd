import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CandidateComponent } from './Pages/registration/candidate/candidate.component';
import { JobListComponent } from './Pages/Admin-Job-view/admin-job-view.component';
import { UserprofileComponent } from './Pages/userprofile/userprofile.component';
import { HomeComponent } from './Pages/home/home.component';
import {VisitorComponent} from './Pages/registration/visitor/visitor.component'; // Import HomeComponent

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent // Set HomeComponent as the starting page
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      }
    ]
  },
  {
    path: 'registration-two',
    component: CandidateComponent
  },
  {
    path: 'userprofile',
    component: UserprofileComponent
  },
  {
    path: 'visitor',
    component: VisitorComponent
  },
];

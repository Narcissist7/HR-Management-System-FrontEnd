import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CandidateComponent } from './Pages/registration/candidate/candidate.component';
import { JobListComponent } from './Pages/Admin-Job-view/admin-job-view.component';
import { UserprofileComponent } from './Pages/userprofile/userprofile.component';
import { HomeComponent } from './Pages/home/home.component';
import {VisitorComponent} from './Pages/registration/visitor/visitor.component';
import {LogEntryComponent} from './Pages/registration/log-entry/log-entry.component';
import {SucessComponent} from './Pages/sucess/sucess.component';
import {FailedComponent} from './Pages/failed/failed.component';
import {AlreadyexistsComponent} from './Pages/alreadyexists/alreadyexists.component';
import {CandidateListComponent} from '../candidate-list/candidate-list.component';
import {CandidateDetailsComponent} from '../candidate-details/candidate-details.component';
import {VisitorListComponent} from '../visitor-list/visitor-list.component';
import {VisitorDetailsComponent} from '../visitor-details/visitor-details.component';
import {EntryLogListComponent} from '../entry-log-list/entry-log-list.component';
import {AdminDashboardComponent} from './Pages/admin-dashboard/admin-dashboard.component';
import {EntryLogDetailsComponent} from '../entry-log-details/entry-log-details.component';
import {CreateAdminComponent} from './Pages/create-admin/create-admin.component';
import {NotAuthorizedComponent} from './Pages/not-authorized/not-authorized.component';
import {AnalyticsComponent} from './Pages/analytics/analytics.component';
// import {ChartComponent} from './Pages/chart/chart.component';


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
  {
    path: 'logEntry',
    component: LogEntryComponent
  },
  {
    path: 'sucess',
    component: SucessComponent
  },
  {
    path: 'failed',
    component: FailedComponent
  },
  {
    path: 'alreadyexists',
    component: AlreadyexistsComponent
  },
  {
    path: 'candidateList',
    component: CandidateListComponent
  },
  {
    path: 'candidateDetails',
    component: CandidateDetailsComponent
  },
  {
    path: 'visitorList',
    component: VisitorListComponent
  },
  {
    path: 'visitorDetails',
    component: VisitorDetailsComponent
  },
  {
    path: 'logList',
    component: EntryLogListComponent
  },
  {
    path: 'logDetails',
    component: EntryLogDetailsComponent
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent
  },
  {
    path:"createAdmin",
    component: CreateAdminComponent
  },
  {
    path:"notAuthorized",
    component: NotAuthorizedComponent
  },
  {
    path:"analytics",
    component:AnalyticsComponent
  }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CandidateComponent } from './Pages/registration/candidate/candidate.component';
import { HomeComponent } from './Pages/home/home.component';
import {VisitorComponent} from './Pages/registration/visitor/visitor.component';
import {LogEntryComponent} from './Pages/registration/log-entry/log-entry.component';
import {SucessComponent} from './Pages/sucess/sucess.component';
import {FailedComponent} from './Pages/failed/failed.component';
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
import {SendemailComponent} from './Pages/forget-password/sendemail/sendemail.component';
import {ValidatetokenComponent} from './Pages/forget-password/validatetoken/validatetoken.component';
import {ChangepasswordComponent} from './Pages/forget-password/changepassword/changepassword.component';
import {AuthGuard} from '../../Services/auth.guard';
import {adminDashboardGuard} from '../../Services/admin-dashboard.guard';
import {ChartRadarDemo} from './Pages/chart/chart-radar-demo/chart-radar-demo.component';
import {AlreadyexistsOCRComponent} from './Pages/registration/alreadyexists-ocr/alreadyexists-ocr.component';
import {Candidate2Component} from './Pages/registration/candidate2/candidate2.component';


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
    path: 'registration-two',
    component: CandidateComponent
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
    component: AdminDashboardComponent , canActivate: [adminDashboardGuard]
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
  },
  {
    path:"sendemail",
    component:SendemailComponent
  },
  {
    path:"validatetoken",
    component:ValidatetokenComponent , canActivate: [AuthGuard]
  },
  {
    path:"changePassword",
    component:ChangepasswordComponent , canActivate:[AuthGuard]
  },
  {
    path:"radar",
    component:ChartRadarDemo
  },
  {
    path:"alreadysexistOCR",
    component:AlreadyexistsOCRComponent
  },
  {
    path: "candidate2",
    component: Candidate2Component
  }

];

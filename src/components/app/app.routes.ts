import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RegistrationOneComponent } from './Pages/registration/registration-one/registration-one.component';
import { RegistrationTwoComponent } from './Pages/registration/registration-two/registration-two.component';
import { RegistrationThreeComponent } from './Pages/registration/registration-three/registration-three.component';
import { JobListComponent } from './Pages/Admin-Job-view/admin-job-view.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: "login",
        pathMatch: 'full'

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'',
        component: LayoutComponent,
        children:
        [
            {
                path: 'dashboard',
                component: DashboardComponent,
            }
        ]
    },
    { 
        path: 'registration-one',
         component: RegistrationOneComponent 
    },
    { 
        path: 'registration-two',
        component: RegistrationTwoComponent 
    },
    { 
        path: 'Job-View',
        component: JobListComponent 
    },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login/login.component';
import { SignupComponent } from './Pages/signup/signup/signup.component';
import { AdminDashboardComponent } from './Pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './Services/AdminGuard/admin.guard';
import { UserDashboardComponent } from './Pages/User/user-dashboard/user-dashboard.component';
import { UserGuard } from './Services/UserGuard/user.guard';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
//admin routerLinks
{path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard],
children:[

],},
//user routerLinks
{path:'user-dashboard',component:UserDashboardComponent,canActivate:[UserGuard],
children:[
],},
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Private Pages/Login/login/login.component';
import { SignupComponent } from './Private Pages/signup/signup/signup.component';
import { AdminDashboardComponent } from './Private Pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './Services/AdminGuard/admin.guard';
import { WelcomeComponent } from './Private Pages/Admin/welcome/welcome.component';
import { ProfileComponent } from './Private Pages/Profile/profile/profile.component';
import { ViewAdminsComponent } from './Private Pages/Admin/view-admins/view-admins.component';
import { ViewUsersComponent } from './Private Pages/Admin/view-users/view-users.component';
import { UserGuard } from './Services/UserGuard/user.guard';
import { UserDashboardComponent } from './Private Pages/User/user-dashboard/user-dashboard.component';
import { ViewProductsComponent } from './Private Pages/Admin/view-products/view-products.component';
import { AddProductComponent } from './Private Pages/Admin/add-product/add-product.component';
import { ViewCustomerAddressComponent } from './Private Pages/Admin/view-customer-address/view-customer-address.component';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
//admin routerLinks
{path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard],
children:[
{path:'',component:WelcomeComponent},
{path:'admin-profile',component:ProfileComponent},
{path:'view-admins',component:ViewAdminsComponent},
{path:'view-users',component:ViewUsersComponent},
{path:'add-products',component:AddProductComponent},
{path:'list-products',component:ViewProductsComponent},
{path:'view-customers',component:ViewCustomerAddressComponent},
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

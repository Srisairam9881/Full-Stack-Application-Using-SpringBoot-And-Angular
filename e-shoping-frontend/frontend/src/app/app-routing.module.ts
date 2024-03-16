import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Private Pages/LoginAndSignup/login/login.component';
import { SignupComponent } from './Private Pages/LoginAndSignup/signup/signup.component';
import { AdminDashboardComponent } from './Private Pages/Admin/WelcomeAndSideBar/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './Services/AdminGuard/admin.guard';
import { WelcomeComponent } from './Private Pages/Admin/WelcomeAndSideBar/welcome/welcome.component';
import { ViewAdminsComponent } from './Private Pages/Admin/Admin-Activites/view-admins/view-admins.component';
import { ViewUsersComponent } from './Private Pages/Admin/Admin-Activites/view-users/view-users.component';
import { UserGuard } from './Services/UserGuard/user.guard';
import { UserDashboardComponent } from './Private Pages/User/User-Activites/user-dashboard/user-dashboard.component';
import { ViewProductsComponent } from './Private Pages/Admin/Product-Activites/view-products/view-products.component';
import { AddProductComponent } from './Private Pages/Admin/Product-Activites/add-product/add-product.component';
import { ViewCustomerAddressComponent } from './Private Pages/Admin/Admin-Activites/view-customer-address/view-customer-address.component';
import { ViewCategoriesComponent } from './Private Pages/Admin/Category-Activities/view-categories/view-categories.component';
import { AdminProfileComponent } from './Private Pages/Admin/Admin-Activites/admin-profile/admin-profile.component';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
//admin routerLinks
{path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard],
children:[
{path:'',component:WelcomeComponent},
{path:'admin-profile',component:AdminProfileComponent},
{path:'view-admins',component:ViewAdminsComponent},
{path:'view-users',component:ViewUsersComponent},
{path:'list-products',component:ViewProductsComponent},
{path:'list-category',component:ViewCategoriesComponent},
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

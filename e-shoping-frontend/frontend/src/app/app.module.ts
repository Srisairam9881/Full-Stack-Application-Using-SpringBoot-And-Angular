import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './helper/auth-service/auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ViewProductsComponent } from './Private Pages/Admin/Product-Activites/view-products/view-products.component';
import { AddProductComponent } from './Private Pages/Admin/Product-Activites/add-product/add-product.component';
import { ViewUsersComponent } from './Private Pages/Admin/Admin-Activites/view-users/view-users.component';
import { ViewAdminsComponent } from './Private Pages/Admin/Admin-Activites/view-admins/view-admins.component';
import { AddAdminComponent } from './Private Pages/Admin/Admin-Activites/add-admin/add-admin.component';
import { WelcomeComponent } from './Private Pages/Admin/WelcomeAndSideBar/welcome/welcome.component';
import { SideBarComponent } from './Private Pages/Admin/WelcomeAndSideBar/side-bar/side-bar.component';
import { UserDashboardComponent } from './Private Pages/User/User-Activites/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Private Pages/Admin/WelcomeAndSideBar/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './Private Pages/LoginAndSignup/signup/signup.component';
import { LoginComponent } from './Private Pages/LoginAndSignup/login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { ViewCustomerAddressComponent } from './Private Pages/Admin/Admin-Activites/view-customer-address/view-customer-address.component';
import {MatDividerModule} from '@angular/material/divider';
import { AddCatgoryComponent } from './Private Pages/Admin/Category-Activities/add-catgory/add-catgory.component';
import { ViewCategoriesComponent } from './Private Pages/Admin/Category-Activities/view-categories/view-categories.component';
import { UpdateCategoryComponent } from './Private Pages/Admin/Category-Activities/update-category/update-category.component';
import { UpdateProductComponent } from './Private Pages/Admin/Product-Activites/update-product/update-product.component';
import { AdminProfileComponent } from './Private Pages/Admin/Admin-Activites/admin-profile/admin-profile.component';
import { ProfileComponent } from './Private Pages/User/User-Activites/profile/profile.component';
import { ConfirmationDialogComponent } from './Private Pages/Admin/Category-Activities/Dialog-confirm/ConfirmationDialogComponent ';

@NgModule({
declarations: [
AppComponent,
NavbarComponent,
FooterComponent,
LoginComponent,
SignupComponent,
AdminDashboardComponent,
UserDashboardComponent,
SideBarComponent,
WelcomeComponent,
AddAdminComponent,
ProfileComponent,
AdminProfileComponent,
ViewAdminsComponent,
ViewUsersComponent,
AddProductComponent,
ViewProductsComponent,
ViewCustomerAddressComponent,
AddCatgoryComponent,
ViewCategoriesComponent,
UpdateCategoryComponent,
UpdateProductComponent,
AdminProfileComponent,
ConfirmationDialogComponent,
],
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
FormsModule,
HttpClientModule,
MatButtonModule,
MatToolbarModule,
MatInputModule,
MatIconModule,
MatDialogModule,
MatCardModule,
MatSidenavModule,
MatListModule,
MatSnackBarModule,
MatTooltipModule,
MatTableModule,
MatDividerModule
],
providers: [authInterceptorProviders],
bootstrap: [AppComponent]
})
export class AppModule { }

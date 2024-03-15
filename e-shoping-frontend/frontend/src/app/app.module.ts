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
import { ViewProductsComponent } from './Private Pages/Admin/view-products/view-products.component';
import { AddProductComponent } from './Private Pages/Admin/add-product/add-product.component';
import { ViewUsersComponent } from './Private Pages/Admin/view-users/view-users.component';
import { ViewAdminsComponent } from './Private Pages/Admin/view-admins/view-admins.component';
import { ProfileComponent } from './Private Pages/Profile/profile/profile.component';
import { AddAdminComponent } from './Private Pages/Admin/add-admin/add-admin.component';
import { WelcomeComponent } from './Private Pages/Admin/welcome/welcome.component';
import { SideBarComponent } from './Private Pages/Admin/side-bar/side-bar.component';
import { UserDashboardComponent } from './Private Pages/User/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Private Pages/Admin/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './Private Pages/signup/signup/signup.component';
import { LoginComponent } from './Private Pages/Login/login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { ViewCustomerAddressComponent } from './Private Pages/Admin/view-customer-address/view-customer-address.component';
import {MatDividerModule} from '@angular/material/divider';

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
ViewAdminsComponent,
ViewUsersComponent,
AddProductComponent,
ViewProductsComponent,
ViewCustomerAddressComponent,

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

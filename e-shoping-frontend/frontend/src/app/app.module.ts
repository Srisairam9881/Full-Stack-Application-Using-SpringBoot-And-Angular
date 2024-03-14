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
import { LoginComponent } from './Pages/Login/login/login.component';
import { SignupComponent } from './Pages/signup/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminDashboardComponent } from './Pages/Admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Pages/User/user-dashboard/user-dashboard.component'; // Import MatDialogModule

@NgModule({
declarations: [
AppComponent,
NavbarComponent,
FooterComponent,
LoginComponent,
SignupComponent,
AdminDashboardComponent,
UserDashboardComponent
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
],
providers: [authInterceptorProviders],
bootstrap: [AppComponent]
})
export class AppModule { }

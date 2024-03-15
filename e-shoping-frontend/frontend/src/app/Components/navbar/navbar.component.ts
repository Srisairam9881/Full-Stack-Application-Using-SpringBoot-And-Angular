import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Private Pages/Login/login/login.component';
import { SignupComponent } from 'src/app/Private Pages/signup/signup/signup.component';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';

@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
isLoggedIn=false;
user:any;
constructor(public login:LoginServiceService,public dialog: MatDialog) { }

ngOnInit(): void {
this.isLoggedIn = this.login.isLoggedIn();
if (this.isLoggedIn) {
this.getCurrentUserDetails();
}
this.login.loginStatusSubject.asObservable().subscribe(data => {
this.isLoggedIn = this.login.isLoggedIn();
if (this.isLoggedIn) {
this.getCurrentUserDetails();
}
});
}
private getCurrentUserDetails(): void {
this.login.getCurrentUser().subscribe(
(user: any) => {
console.log("Current user:", user);
this.user = user;
},
(error: any) => {
console.error("Failed to fetch current user:", error);
// Handle error if necessary
}
);
}
openLoginDialog(): void {
const dialogRef = this.dialog.open(LoginComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
opensignUpDialog(){
const dialogRef = this.dialog.open(SignupComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed'); 
});
}
public logout()
{
this.login.logout();
window.location.reload()
}
}

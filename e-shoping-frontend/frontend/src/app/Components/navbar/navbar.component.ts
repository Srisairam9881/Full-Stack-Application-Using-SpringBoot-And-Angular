import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginComponent } from 'src/app/Private Pages/LoginAndSignup/login/login.component';
import { SignupComponent } from 'src/app/Private Pages/LoginAndSignup/signup/signup.component';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';

@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
isLoggedIn=false;
user:any;
constructor(public login:LoginServiceService,public dialog: MatDialog,public router:Router) { }

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
gotoProfilePage() {
this.login.getUserRole().pipe(
map((role: string) => {
if (this.login.isLoggedIn() && role === 'ROLE_ADMIN') {
this.router.navigate(['/admin-dashboard/admin-profile']);
return true;
} else {
this.router.navigate(['/user/user-profile']);
return false;
}
})
).subscribe(); // Subscribe to trigger the execution of the observable
}

}

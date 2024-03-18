import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginComponent } from 'src/app/Private Pages/LoginAndSignup/login/login.component';
import { SignupComponent } from 'src/app/Private Pages/LoginAndSignup/signup/signup.component';
import { ProfileComponent } from 'src/app/Private Pages/User/User-Activites/profile/profile.component';
import { ViewCartsComponent } from 'src/app/Private Pages/User/view-carts/view-carts.component';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';

@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
isLoggedIn=false;
user:any;
constructor(public login:LoginServiceService,private dialog: MatDialog,private router:Router) { }

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
this.openProfileDialog();
return true;
}
})
).subscribe(); // Subscribe to trigger the execution of the observable
}
openProfileDialog(): void {
this.dialog.open(ProfileComponent, {
disableClose: false // Prevent closing the dialog by clicking outside or pressing ESC key
});
}
gotocartList():void{
const dialogRef=this.dialog.open(ViewCartsComponent)
dialogRef.afterClosed().subscribe(result=>{
console.log("The dialog was closed");
})
}
}


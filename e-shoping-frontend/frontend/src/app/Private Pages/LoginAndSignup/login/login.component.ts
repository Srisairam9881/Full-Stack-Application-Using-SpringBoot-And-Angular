import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginDto= {
usernameOrEmail: '',
password: ''
};
errorMessage: string = '';

constructor(
public dialogRef: MatDialogRef<LoginComponent>,
public authService: LoginServiceService,
private router: Router,
public snackBar:MatSnackBar
) {}

login() {
// Request to server to generate token
this.authService.login(this.loginDto).subscribe(
(data: any) => {
this.dialogRef.close();
// Login
this.authService.loginUser(data.accessToken, data);
// Get current user details
this.authService.getCurrentUser().subscribe(
(user: any) => {
// Get user role
this.authService.getUserRole().subscribe(
(role: string | null) => {
if (role === "ROLE_ADMIN") {
this.snackBar.open('Welcome Admin!!!', 'Close', {
duration: 3000
});
this.router.navigate(['admin-dashboard']);
} 
else if (role === "ROLE_USER") {
this.snackBar.open('Welcome User Your logged successfully', 'Close', {
duration: 3000
});
this.router.navigate(['']);
} 
else {
this.errorMessage ='Invalid user role';
}
this.authService.loginStatusSubject.next(true);
},
err => {
this.errorMessage = ('Failed to fetch user role'+err);
this.authService.logout();
}
);
},
err => {
this.errorMessage = ('Failed to fetch current user'+err);
this.authService.logout();
}
);
},
err => {
this.errorMessage =('Login failed. Please check your credentials.'+err);
}
);
}
}

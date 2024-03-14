import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginDto: {
usernameOrEmail: string;
password: string;
} = { usernameOrEmail: '', password: '' };

errorMessage: string = '';

constructor(
public dialogRef: MatDialogRef<LoginComponent>,
public authService: LoginServiceService,
private router: Router
) {}

login() {
// Request to server to generate token
this.authService.login(this.loginDto).subscribe(
(data: any) => {
console.log("Login successful");
console.log(data);
this.dialogRef.close();
// Login
this.authService.loginUser(data.accessToken, data);
// Get current user details
this.authService.getCurrentUser().subscribe(
(user: any) => {
console.log("Current user:", user);
// Get user role
this.authService.getUserRole().subscribe(
(role: string | null) => {
if (role === "ROLE_ADMIN") {
this.router.navigate(['admin-dashboard']);
} else if (role === "ROLE_USER") {
this.router.navigate(['user-dashboard']);
} else {
this.errorMessage = 'Invalid user role';
}
this.authService.loginStatusSubject.next(true);
},
err => {
console.error("Failed to fetch user role:", err);
this.errorMessage = 'Failed to fetch user role';
this.authService.logout(); // Log out on error
}
);
},
err => {
console.error("Failed to fetch current user:", err);
this.errorMessage = 'Failed to fetch current user';
this.authService.logout(); // Log out on error
}
);
},
err => {
console.error("Login failed:", err);
this.errorMessage = 'Login failed. Please check your credentials.';
}
);
}
}

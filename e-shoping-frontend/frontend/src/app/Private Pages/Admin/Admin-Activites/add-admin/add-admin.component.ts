import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user-service/user.service';

@Component({
selector: 'app-add-admin',
templateUrl: './add-admin.component.html',
styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
user=
{
username:'',
password:'',
email:'',
firstName:'',
lastName:'',
phoneNo:'',
}
errorMessage: string = '';
constructor(
public dialogRef: MatDialogRef<AddAdminComponent>,
public authService: UserService,
private router: Router,
public snackBar:MatSnackBar
) {}
signup(){
// Check if any of the required fields are empty
if (!this.user.username || !this.user.password || !this.user.email || !this.user.firstName || !this.user.lastName || !this.user.phoneNo) {
this.errorMessage = 'All fields are required.';
return;
}

this.authService.createNewAdmin(this.user).subscribe((data)=>{
window.location.reload();
this.snackBar.open('Admin added successfully', 'Close', {
duration: 3000
});
this.router.navigate(['/admin-dashboard/view-admins'])
this.dialogRef.close();
},

(err) => {
console.error(err);
if (err.status === 409 && err.error && err.error.message === "Username already exists") {
this.errorMessage = 'Username is already taken. Please choose another one.';
} else if (err.status === 409 && err.error && err.error.message === "Email already exists") {
this.errorMessage = 'Email is already registered. Please use another email address.';
} else {
this.errorMessage = 'Something went wrong. Please try again later.try another username or email';
}
}
);
}
}

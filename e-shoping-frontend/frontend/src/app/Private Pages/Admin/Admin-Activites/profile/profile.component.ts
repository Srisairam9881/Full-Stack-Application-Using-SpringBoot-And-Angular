import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';
import { UserService } from 'src/app/Services/user-service/user.service';
@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
@Input() profile: any; // Assuming profile is passed as an Input
showActions: boolean = false;
isEditing: boolean = false;
user: any = {};

constructor(private login: LoginServiceService, public userService: UserService,public router:Router, private snackBar: MatSnackBar) { }

ngOnInit(): void {
this.loadCurrentUser();
}
loadCurrentUser() {
this.login.getCurrentUser().subscribe(
(user: any) => {
this.user = user;
console.log(user);
},
err => {
this.snackBar.open('Error occurred while fetching user details.', 'Close', {
duration: 3000
});
}
);
}
startEditing() {
this.isEditing = true;
}
saveProfile() {
this.userService.updateDetails(this.user.username, this.user).subscribe(
(updatedUser: any) => {
this.snackBar.open('Profile updated successfully', 'Close', {
duration: 3000
});
this.isEditing = false;
},
err => {
this.snackBar.open('Error occurred while updating profile.', 'Close', {
duration: 3000
});
}
);
this.isEditing = false;
}

deleteProfile(){
if (confirm("Are you sure you want to delete your account?")) {
this.userService.deleteUser(this.user.username).subscribe(
() => {
window.localStorage.clear();
window.location.reload();
this.router.navigate(['/']);
this.snackBar.open('Profile deleted successfully', 'Close', {
duration: 3000
});
},
err => {
console.error("Error occurred while deleting profile:", err);
this.snackBar.open('Error occurred while deleting profile', 'Close', {
duration: 3000
});
}
);
}
}

}

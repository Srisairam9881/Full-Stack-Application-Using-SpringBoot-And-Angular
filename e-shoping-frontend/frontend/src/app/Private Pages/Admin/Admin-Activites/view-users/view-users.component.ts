import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-view-users',
templateUrl: './view-users.component.html',
styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
users: any[] = [];
displayedColumns: string[] = ['username', 'email', 'fullName', 'phoneNo','role'];
constructor(private adminActions: AdminActionsService,public snackBar:MatSnackBar) { }
ngOnInit(): void {
this.loadUsers();
}

loadUsers() {
this.adminActions.getAllUsers().subscribe(
(data:any)=>{
this.users=data;
},(err)=>{
this.snackBar.open('Error to fetching the data'+err, 'Close', {
duration: 3000
});
})
}
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-view-admins',
templateUrl: './view-admins.component.html',
styleUrls: ['./view-admins.component.css']
})
export class ViewAdminsComponent implements OnInit{
users=[
{
username: '',
password: '',
email: '',
firstName: '',
lastName: '',
phoneNo: '',
role:'',
}
];
searchQuery: string = '';
displayedColumns: string[] = ['username', 'email', 'fullName', 'phoneNo','role'];
constructor(private adminActions: AdminActionsService,public snackBar:MatSnackBar) { }
ngOnInit(): void {
this.loadUsers();
}

loadUsers() {
this.adminActions.getAllAdmins().subscribe(
(data:any)=>{
this.users=data;
},(err)=>{
this.snackBar.open('Error to fetching the data'+err, 'Close', {
duration: 3000
});
})
}
}

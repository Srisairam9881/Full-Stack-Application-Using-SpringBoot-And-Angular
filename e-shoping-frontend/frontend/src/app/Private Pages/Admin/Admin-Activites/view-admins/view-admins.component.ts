import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

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
filteredItems: any[] = [];
searchTerm: string = '';
showGoTopButton = false;
displayedColumns: string[] = ['username', 'email', 'fullName', 'phoneNo','role'];
constructor(private adminActions: AdminActionsService,public snackBar:MatSnackBar,public dialog:MatDialog) { }
ngOnInit(): void {
this.loadUsers();
}

loadUsers() {
this.adminActions.getAllAdmins().subscribe(
(data:any)=>{
this.users=data;
this.filteredItems = data;
},(err)=>{
this.snackBar.open('Error to fetching the data'+err, 'Close', {
duration: 3000
});
})
}
search(): void {
this.filteredItems = this.users.filter(item =>
item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
item.username.toLowerCase().includes(this.searchTerm.toLowerCase())
);
}
@HostListener('window:scroll', [])
onWindowScroll() {
// Show/hide the "Go to Top" button based on scroll position
if (window.pageYOffset > 100) { // Adjust the scroll position as needed
this.showGoTopButton = true;
} else {
this.showGoTopButton = false;
}
}
goToTop() {
// Smooth scroll to the top of the page
window.scrollTo({ top: 0, behavior: 'smooth' });
}
AddNewAdmin(){
const dialogRef=this.dialog.open(AddAdminComponent);
dialogRef.afterClosed().subscribe((result)=>{
console.log("The dialog was closed");
})
}
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-add-catgory',
templateUrl: './add-catgory.component.html',
styleUrls: ['./add-catgory.component.css']
})
export class AddCatgoryComponent {
category={
categoryName:'',
type:''
};
errorMessage: string = '';
constructor(
public dialogRef: MatDialogRef<AddCatgoryComponent>,
private adminActions: AdminActionsService,
private router: Router,
public snackBar:MatSnackBar
){}
Category(){
this.adminActions.createNewcategory(this.category).subscribe((data:any)=>{
this.category=data;
this.dialogRef.close();
this.router.navigate(['/admin-dashboard/list-category/'])
this.snackBar.open('category has been added successfully','close',{duration: 3000});
window.location.reload();
},
(err)=>{
this.errorMessage=('failed to added data'+err);
})
}

}

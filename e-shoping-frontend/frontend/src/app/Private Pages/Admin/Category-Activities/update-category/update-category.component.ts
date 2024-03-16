import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-update-category',
templateUrl: './update-category.component.html',
styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
cid=0
category={
id:'',
categoryName:'',
type:''
};
errorMessage: string = '';
constructor(
public dialogRef: MatDialogRef<UpdateCategoryComponent>,
private adminActions: AdminActionsService,
@Inject(MAT_DIALOG_DATA)public data: any,
private route:ActivatedRoute,
private router: Router,
public snackBar:MatSnackBar
){}
ngOnInit(): void {
// Assign the passed data to the category object
this.cid = this.data.id;
this.category = this.data;
}
Update(): void {
this.adminActions.updateCategory(this.cid, this.category).subscribe(
(data: any) => {
this.category = data;
this.dialogRef.close();
this.snackBar.open('category has been updated successfully','close',{duration:3000});
// Handle success message or action
},
(err) => {
// Handle error
}
);
}

}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
constructor(public dialog: MatDialog) { }
openAddAdminDialog(): void {
const dialogRef = this.dialog.open(AddAdminComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
}

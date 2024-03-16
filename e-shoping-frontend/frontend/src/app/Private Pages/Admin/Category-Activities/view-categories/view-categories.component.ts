import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { AddCatgoryComponent } from '../add-catgory/add-catgory.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../Dialog-confirm/ConfirmationDialogComponent ';

@Component({
selector: 'app-view-categories',
templateUrl: './view-categories.component.html',
styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
Category:any[]=[];
searchTerm: string = '';
showGoTopButton = false;

constructor(private adminActions: AdminActionsService,public dialog:MatDialog,public snackBar:MatSnackBar) { }

ngOnInit(): void {
this.loadData();
}
loadData(): void {
// Call your data service to fetch items
this.adminActions.getAllCategories().subscribe((data: any) => {
this.Category = data;
});
}
CategoryMatchesSearch(category: any): boolean {
const searchTermLowerCase = this.searchTerm.toLowerCase();
const categoryName = category && category.categoryName ? category.categoryName.toLowerCase() : '';
const categoryType = category && category.type ? category.type.toLowerCase() : '';
return categoryName.includes(searchTermLowerCase) || categoryType.includes(searchTermLowerCase);
}

editC(category: any): void {
const dialogRef = this.dialog.open(UpdateCategoryComponent,{data: category});
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
deleteC(cid: any): void {
const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
data: { message: 'Are you sure you want to delete this category?' }
});
dialogRef.afterClosed().subscribe(result => {
if (result) {
this.adminActions.deleteCategory(cid).subscribe((response: any) => {
this.snackBar.open('category has been deleted successfully','close',{duration:3000});
window.location.reload();
}, (error) => {
this.snackBar.open('Something went wrong in the backend!', 'close', { duration: 3000 });
});
}
});
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
AddNew(): void {
const dialogRef = this.dialog.open(AddCatgoryComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
}

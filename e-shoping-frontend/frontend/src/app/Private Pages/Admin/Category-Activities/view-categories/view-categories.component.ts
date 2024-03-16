import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { AddCatgoryComponent } from '../add-catgory/add-catgory.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
selector: 'app-view-categories',
templateUrl: './view-categories.component.html',
styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
Category: any[] = [];
filteredItems: any[] = [];
searchTerm: string = '';
showGoTopButton = false;

constructor(private adminActions: AdminActionsService,public dialog:MatDialog) { }

ngOnInit(): void {
this.loadData();
}

loadData(): void {
// Call your data service to fetch items
this.adminActions.getAllCategories().subscribe((data: any) => {
this.Category = data;
this.filteredItems = data;
});
}

editItem(category: any): void {
const dialogRef = this.dialog.open(UpdateCategoryComponent,{data: category});
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}

deleteItem(item: any): void {
// Implement delete logic here
}

search(): void {
this.filteredItems = this.Category.filter(item =>
item.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
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
AddNew(): void {
const dialogRef = this.dialog.open(AddCatgoryComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
}

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { ConfirmationDialogComponent } from '../../Category-Activities/Dialog-confirm/ConfirmationDialogComponent ';

@Component({
selector: 'app-view-products',
templateUrl: './view-products.component.html',
styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
products:any[]=[]
filteredItems: any[] = [];
searchTerm: string = '';
showGoTopButton = false;

constructor(private adminActions: AdminActionsService,public dialog:MatDialog,public snackBar:MatSnackBar) { }

ngOnInit(): void {
this.loadData();
}
loadData(): void {
this.adminActions.getAllProducts().subscribe((data: any) => {
this.products = data;
this.filteredItems = data;
console.log(data);
});
}
productMatchesSearch(productResponse: any): boolean {
const searchTermLowerCase = this.searchTerm.toLowerCase();
const productName = productResponse.p.productName.toLowerCase();
const categoryName = productResponse.p.category.categoryName.toLowerCase();
return productName.includes(searchTermLowerCase) || categoryName.includes(searchTermLowerCase);
}
editC(product: any): void {
const dialogRef = this.dialog.open(UpdateProductComponent,{data: product});
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
deleteC(pid: any): void {
const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
data: { message: 'Are you sure you want to delete this category?' }
});
dialogRef.afterClosed().subscribe(result => {
if (result) {
this.adminActions.deleteProduct(pid).subscribe((response: any) => {
// Remove the deleted category from the Category array
this.products = this.products.filter(item => item.id !== pid);
// Update the filtered items as well
this.filteredItems = this.filteredItems.filter(item => item.id !== pid);
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
if (window.pageYOffset > 100) {
this.showGoTopButton = true;
} else {
this.showGoTopButton = false;
}
}
goToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}
AddNew(): void {
const dialogRef = this.dialog.open(AddProductComponent);
dialogRef.afterClosed().subscribe(result => {
console.log('The dialog was closed');
});
}
}

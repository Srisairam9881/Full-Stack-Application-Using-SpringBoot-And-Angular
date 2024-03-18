import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Private Pages/LoginAndSignup/login/login.component';

@Component({
selector: 'app-product-detail',
templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
products: any;
isLoggedIn!: boolean;
constructor(
private route: ActivatedRoute,
private productService: AdminActionsService,
private snackbar: MatSnackBar,
private authService:LoginServiceService,
private dialog: MatDialog 
) { }
ngOnInit(): void {
this.route.params.subscribe(params => {
const modelName = params['modelName'];
this.loadProduct(modelName);
this.isLoggedIn = this.authService.isLoggedIn();
});
}
loadProduct(modelName: string): void {
this.productService.getProductByName(modelName).subscribe(
(data: any) => {
if (Array.isArray(data)) {
// If the response is an array, assume it's a list of products and assign it directly
this.products = data;
} else {
// If the response is a single product object, wrap it in an array
this.products = [data];
}
},
(err) => {
this.snackbar.open('Something went wrong on the server. Please try again later.', 'Close', { duration: 3000 });
}
);
}
calculateDiscount(originalPrice: number, offeredPrice: number): number {
return Math.round(((originalPrice - offeredPrice) / originalPrice) * 100);
}
addToCart(product: any): void {
if (this.isLoggedIn) {
} else {
this.openLoginDialog();
}
}
buyNow(product: any): void {
if (this.isLoggedIn) {
} else {
this.openLoginDialog();
}
}
openLoginDialog(): void {
this.dialog.open(LoginComponent, {
disableClose: false
});
}
}


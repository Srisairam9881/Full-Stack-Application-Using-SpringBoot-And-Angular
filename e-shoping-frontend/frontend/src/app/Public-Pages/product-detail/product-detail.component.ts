import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-product-detail',
templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
products: any;
constructor(
private route: ActivatedRoute,
private productService: AdminActionsService,
public snackbar: MatSnackBar
) { }
ngOnInit(): void {
this.route.params.subscribe(params => {
const productName = params['productName'];
this.loadProduct(productName);
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
// Implement addToCart functionality here
}

buyNow(product: any): void {
// Implement buyNow functionality here
}
}

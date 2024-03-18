import { Component, OnInit } from '@angular/core';
import { UserActionService } from 'src/app/Services/User-Actions/user-action.service';
import { LoginServiceService } from 'src/app/Services/login-service/login-service.service';
import { switchMap } from 'rxjs/operators';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
selector: 'app-view-carts',
templateUrl: './view-carts.component.html',
styleUrls: ['./view-carts.component.css']
})
export class ViewCartsComponent implements OnInit {
cartItems: any[] = [];
products:any[]=[];
hasData: boolean = false;
modelName!: string;
constructor(private authService: LoginServiceService, 
private cartItemService: UserActionService,
private userActions:AdminActionsService,
private snackbar:MatSnackBar,
private dialog:MatDialog
){ }
ngOnInit(): void {
this.fetchCartItems();
}
loadProduct(modelName: string): void {
this.userActions.getProductByName(modelName).subscribe(
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

fetchCartItems(): void {
this.authService.getCurrentUser().pipe(
switchMap((currentUser: any) => {
if (!currentUser) {
console.error('Current user not found.');
throw new Error('Current user not found.');
}
const username = currentUser.username;
return this.cartItemService.getAllCarts(username);
})
).subscribe({
next: (cartItems: any) => {
this.cartItems = cartItems;
this.hasData = cartItems.length > 0;
console.log('Cart Items:', this.cartItems); 
},
error: (error) => {
console.error('Failed to fetch cart items:', error);
}
});
}

removeFromCart(product: any): void {
if (this.authService.isLoggedIn()) {
const productId = product.id; // Assuming 'id' is the property that identifies the product
// Subscribe to the observable returned by getCurrentUser()
this.authService.getCurrentUser().subscribe({
next: (user: any) => {
// Check if user and user ID exist
if (user && user.id) {
const userId = user.id;
// Call removeFromCart method of cartService with required parameters
this.cartItemService.removeCart(userId, productId).subscribe({
next: () => {
this.snackbar.open('Item removed from cart successfully', 'Close', { duration: 3000 });
window.location.reload();
},
error: (error) => {
console.error('Failed to remove item from cart:', error);
this.snackbar.open('Failed to remove item from cart. Please try again later.', 'Close', { duration: 3000 });
}
});
} else {
console.error('User ID is missing.');
}
},
error: (error) => {
console.error('Failed to get current user:', error);
// Handle error appropriately, e.g., show error message to the user
this.snackbar.open('Failed to get current user. Please try again later.', 'Close', { duration: 3000 });
}
});
}
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper/baseUrl/helper';

@Injectable({
providedIn: 'root'
})
export class UserActionService {
constructor(private http:HttpClient) { }
//get All Carts
public getAllCarts(usernameOrEmail:any){
return this.http.get(`${baseUrl}/cart/user/${usernameOrEmail}`);
}
//add user cart
public addToCart(userId: number, productId: number, quantity: number) {
const body = { userId, productId, quantity }; // Create a request body object
return this.http.post(`${baseUrl}/cart/add`, body); // Pass the request body to the post method
}
//remove user cart
public removeCart(userId: number, productId: number){
const body = { userId, productId }; // Create a request body object
return this.http.post(`${baseUrl}/cart/remove`, body);
}
}

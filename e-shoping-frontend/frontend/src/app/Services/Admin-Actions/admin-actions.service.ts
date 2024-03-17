import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper/baseUrl/helper';

@Injectable({
providedIn: 'root'
})
export class AdminActionsService {

constructor(private http:HttpClient) { }
//get All Admins
public getAllAdmins(){
return this.http.get(`${baseUrl}/api/admin/admins`);
}
//get All Admins
public getAllUsers(){
return this.http.get(`${baseUrl}/api/admin/users`);
}
//get All users address
public getAllCustomerAddess(){
return this.http.get(`${baseUrl}/api/admin/all`);
}
//add new categories
public createNewcategory(Category:any){
return this.http.post(`${baseUrl}/api/categories/create`,Category,{ responseType:'text' });
}
//update existing category
public updateCategory(cid:number,Category:any){
return this.http.put(`${baseUrl}/api/categories/update/${cid}`,Category,{ responseType:'text' });
}
//get All Categories
public getAllCategories(){
return this.http.get(`${baseUrl}/api/categories/all`);
}
//Search Category
public SearchCategory(){
return this.http.get(`${baseUrl}/api/categories/search`,{ responseType:'text' });
}
//delete category
public deleteCategory(cid:number){
return this.http.delete(`${baseUrl}/api/categories/delete/${cid}`,{ responseType:'text' });
}
//add new product
public addProduct(formData:FormData){
return this.http.post(`${baseUrl}/api/products/add`,formData,{ responseType:'text' });
}
//update product
public updateProduct(id:number,formData:FormData){
return this.http.put(`${baseUrl}/api/products/update/${id}`,formData,{ responseType:'text' });
}
// get All products
public getAllProducts(){
return this.http.get(`${baseUrl}/api/products/allProducts`);
}
//get Products By Name
public getProductByName(productName:any){
return this.http.get(`${baseUrl}/api/products/${productName}`); 
}
//delete Product
public deleteProduct(pid:number){
return this.http.delete(`${baseUrl}/api/products/delete/${pid}`,{ responseType:'text' })
}
}

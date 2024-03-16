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
public deleteCategory(cid:any){
return this.http.delete(`${baseUrl}/api/categories/delete/${cid}`,{ responseType:'text' });
}
}

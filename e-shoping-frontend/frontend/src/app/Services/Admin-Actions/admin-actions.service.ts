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
}

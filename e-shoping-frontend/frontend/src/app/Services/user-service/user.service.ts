import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper/baseUrl/helper';

@Injectable({
providedIn: 'root'
})
export class UserService {
constructor(private http:HttpClient) { }
//add User
public signup(user:any){
return this.http.post(`${baseUrl}/api/auth/user/register`,user,{ responseType: 'text' });
}
//add new Admin
public createNewAdmin(user:any){
return this.http.post(`${baseUrl}/api/auth/admin/register`,user);
}
//get userDetails
public getUserDetails(usernameOrEmail:any){
return this.http.get(`${baseUrl}/api/auth/${usernameOrEmail}`);
}
//update userDetails
public updateDetails(usernameOrEmail:any,user:any){
return this.http.put(`${baseUrl}/api/auth/${usernameOrEmail}`,user);
}
//delete user account
public deleteUser(usernameOrEmail:any){
return this.http.delete(`${baseUrl}/api/auth/${usernameOrEmail}`);
}
}

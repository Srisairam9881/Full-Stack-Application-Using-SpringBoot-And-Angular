import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import baseUrl from 'src/app/helper/baseUrl/helper';

@Injectable({
providedIn: 'root'
})
export class LoginServiceService {
constructor(private http: HttpClient) { }

public loginStatusSubject = new Subject<boolean>();

// generate token
public login(loginData: any) {
return this.http.post(`${baseUrl}/api/auth/login`, loginData);
}

// current user: which is logged in
public getCurrentUser() {
return this.http.get(`${baseUrl}/api/auth/current-user`);
}

// login user: set token in local storage
public loginUser(token: string, user: any) {
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
this.loginStatusSubject.next(true);
}

// isLogin: user is logged in or not
public isLoggedIn() {
let tokenStr = localStorage.getItem("token");
return !!tokenStr; // Returns true if tokenStr is not null, undefined, or an empty string; otherwise, returns false
}

// logout: remove token and user from local storage
public logout() {
localStorage.removeItem('token');
localStorage.removeItem('user');
this.loginStatusSubject.next(false);
return true;
}

// get token
public getToken() {
return localStorage.getItem('token');
}
public getTokenType(): string | null {
// Implementation depends on how you manage the token type
// For example, you might store it in local storage or retrieve it from the API response
// Here, we assume it's stored in local storage
return 'Bearer'; // Replace this with your implementation
}

// get user
public getUser() {
let userStr = localStorage.getItem("user");
return userStr ? JSON.parse(userStr) : null;
}
// get UserRole
public getUserRole() {
return this.getCurrentUser().pipe(map((user: any) => {
if (user && user.roles && user.roles.length > 0) {
return user.roles[0]; // Assuming the user roles are stored as an array and you want to return the first role
} else {
return null; // or return a default role if needed
}
}));
}
}

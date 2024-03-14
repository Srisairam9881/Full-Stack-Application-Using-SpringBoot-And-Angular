import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginServiceService } from '../login-service/login-service.service';

@Injectable({
providedIn: 'root'
})
export class UserGuard implements CanActivate {
constructor(private login:LoginServiceService,private router:Router){}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.login.getUserRole().pipe(
map((role: string | null) => {
if (this.login.isLoggedIn() && role === 'ROLE_USER') {
return true;
} else {
this.router.navigate(['login']);
return false;
}
})
);
}
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../login-service/login-service.service';
import { map } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(private login: LoginServiceService, private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

return this.login.getUserRole().pipe(
map((role: string | null) => {
if (this.login.isLoggedIn() && role === 'ROLE_ADMIN') {
return true;
} else {
this.router.navigate(['login']);
return false;
}
})
);
}
}

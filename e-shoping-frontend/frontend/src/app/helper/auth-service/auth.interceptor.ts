import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServiceService } from "src/app/Services/login-service/login-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private login: LoginServiceService) {}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// Clone the request
let authReq = req;
// Check if access token and token type are available
const accessToken = this.login.getToken();
const tokenType = this.login.getTokenType();
// If both access token and token type are available, add them to the request headers
if (accessToken && tokenType) {
authReq = req.clone({
setHeaders: {
Authorization: `${tokenType} ${accessToken}`
}
});
}
// Pass the modified request to the next interceptor or handler
return next.handle(authReq);
}
}
// Provider for the HTTP interceptor
export const authInterceptorProviders = [
{
provide: HTTP_INTERCEPTORS,
useClass: AuthInterceptor,
multi: true
}
];

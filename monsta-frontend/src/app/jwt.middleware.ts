import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router   } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   constructor(private router:Router) {}
  decodeAndCheckTokenExpiry(token: string): boolean {
    // decode the token to get the payload
    if(token==null) return false;
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  
    // check if the expiry date is in the past
    const isExpired = Date.now() >= tokenPayload.exp * 1000;
  
    return isExpired;
  }
  


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const excludedRoutes = ['/login', '/register'];
      if (excludedRoutes.some(route => request.url.includes(route))) {
        // if it does, return the request without modifying it
        return next.handle(request);
      }
        let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
       
        if(this.decodeAndCheckTokenExpiry(token)) 
        {
          this.router.navigate(['/login']) 
        }
        if(!token) this.router.navigate(['/login'])
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
  



}

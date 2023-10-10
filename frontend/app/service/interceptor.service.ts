import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor
{
  constructor(private inject:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //injecting auth service
  let authservice=this.inject.get(AuthService);
  console.log("intercept worked");
    let jwtToken =req.clone({
    //setting headers
    setHeaders:
    {
      Authorization:'bearer'+authservice.getToken()
    }
 });
  return next.handle(jwtToken);
}
}

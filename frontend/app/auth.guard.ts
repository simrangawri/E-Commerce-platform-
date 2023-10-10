import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate 
{
  constructor(private service:AuthService,private route:Router){}
  //in built function to apply restrictions to non-user
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean>
    {
      if(this.service.isLoggedIn())
      {
        return true;
      }
      else
      {
        this.route.navigate(["login"]);
        return false
      }
    }
}


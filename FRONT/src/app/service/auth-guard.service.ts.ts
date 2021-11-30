import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginValidate: LoginComponent, private router: Router) { }
  // canActivate(): boolean {
  //   return this.loginValidate.isAuthenticated();
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.loginValidate.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
      return true;
      
  }

  
}

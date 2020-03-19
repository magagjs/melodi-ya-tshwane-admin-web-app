import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public authService: AuthService, public router: Router) { }

  // use authService to check if user is logged in-details in authService
  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
      this.router.navigate([''],{skipLocationChange: true});
      return false;
    }
    return true;
  }

}

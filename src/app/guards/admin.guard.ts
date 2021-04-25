import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: any;
  constructor(private authService: AuthService, private router: Router){
      this.user = this.authService.getIdentity();
  }
  canActivate(){
    if(this.user.role == 'administrador'){
      return true;
    }else{
      this.router.navigate[('/inicio')];
      return false;
    }
  }
  
}

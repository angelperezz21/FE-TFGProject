import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilanteBeneficiarioGuard implements CanActivate {

  
  constructor(private _router: Router) {    
    
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      if(token!==null){
        if(token!==""){             
          if((new JwtHelperService()).decodeToken(token).role==='Beneficiario'){
            return true;
          }
          
        }
      }
      
      this._router.navigate(['/','Inicio'])
      return false;
  }
  
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../Services/interceptor/user-auth.service";
import {ShareServiceService} from "../Services/share-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService : UserAuthService,
              private share : ShareServiceService,
              private router : Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userAuthService.getToken() !== null){
     const role = this.userAuthService.getRole();

      // if you already logged and just navigate between pages
     if (this.userAuthService.isLoggedIn()){
        return true;}

      if (role ){
       const match = this.share.roleMatch(role)
        if(match){
          console.log("role match");
          return true;
        }
        else{
            this.router.navigate(['/forbidden']);
            return false;

        }



      }


    }
    const role = this.userAuthService.getRole();
   if(role === "DOCTOR"){
     this.router.navigate(['/authentifier'])
     return  false;
   }
   else if(role === "ADMIN"){
     this.router.navigate(['/login'])
     return  false;
   }

      this.router.navigate(['/loginPatient'])
      return false;



  }

}

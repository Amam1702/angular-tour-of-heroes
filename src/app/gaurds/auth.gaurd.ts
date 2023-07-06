import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  canActivate() {
debugger
    //get the jwt token which are present in the local storage
    const token = JSON.parse(localStorage.getItem("token")).token

    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    // if (token && !this.jwtHelper.isTokenExpired(token)){
    //   return true;
    // }
    if(token)
    {
      return true
    }
    this.router.navigate(["login"]);
    return false;
  }

}

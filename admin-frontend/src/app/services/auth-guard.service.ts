import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('accesToken')) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    console.log("Must login first!!");
    this.router.navigate(['/login']);
    return false;
  }
}
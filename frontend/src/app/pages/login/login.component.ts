import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthService,
              private router: Router) {}

  email: string = ""
  password: string = ""

  ngOnInit() {
    localStorage.removeItem('accesToken')
  }
  

  login(){
    this.service.login(this.email,this.password)
    .pipe(first()).subscribe(
      res => {
        localStorage.setItem('accesToken', "Bearer " + res.token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

}

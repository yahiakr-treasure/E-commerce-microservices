import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthService) {}

  email: string = ""
  password: string = ""

  ngOnInit() {}
  

  login(){
    this.service.login(this.email,this.password)
    .pipe(first()).subscribe(
      res => {
        localStorage.setItem('accesToken', "Bearer " + res.token);    
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ROOT_URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public login(email:string,password:string){

    let data = {
      email : email,
      password : password,
    }

    return this.http.post<any>(this.ROOT_URL+'/users/auth/login',data)
    .pipe(map(res => {
      return res;
    }));
  }

  public signin(email:string,password:string){

    let data = {
      email : email,
      password : password,
    }

    return this.http.post<any>(this.ROOT_URL+'/users/auth',data)
    .pipe(map(res => {
      return res;
    }));
  }

}

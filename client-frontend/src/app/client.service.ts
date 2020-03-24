import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly ROOT_URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public get_products(){
    return this.http.get<any>(this.ROOT_URL+'/feed')
    .pipe(map(res => {
      return res;
    }));
  }

  public send_order(item:number, client:string){

    let body = {
      item: item,
      client: client
    };

    return this.http.post<any>(this.ROOT_URL+'/orders/',body)
    .pipe(map(res => {
      return res;
    }));
  }
}

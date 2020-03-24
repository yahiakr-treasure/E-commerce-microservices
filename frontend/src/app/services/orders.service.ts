import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  readonly ROOT_URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public get_orders(){
    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});

    return this.http.get<any>(this.ROOT_URL+'/orders',{ headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }

  public update_order(id:string, state:boolean){

    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});

    let body = {
      state : state
    };

    return this.http.patch<any>(this.ROOT_URL+'/orders/'+id,body,{ headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }

  public add_order(item:string, client:string){

    let body = {
      item: item,
      client: client,
    };

    return this.http.post<any>(this.ROOT_URL+'/orders/',body)
    .pipe(map(res => {
      return res;
    }));
  }
}

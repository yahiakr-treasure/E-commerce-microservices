  import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private ROOT_URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public list(type: string){

    const params = new HttpParams()
    .set("type",type);

    
    return this.http.get<any>(this.ROOT_URL + "/products",{params: params})
    .toPromise().then(data => {
      return data;
    });
  }

  public findOne(id: any){
    
    return this.http.get<any>(this.ROOT_URL + "/products/" + id)
    .toPromise().then(data => {
      return data;
    });
  }
}

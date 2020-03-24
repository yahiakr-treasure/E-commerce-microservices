import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly ROOT_URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  public get_products(){
    return this.http.get<any>(this.ROOT_URL+'/feed')
    .pipe(map(res => {
      return res;
    }));
  }

  public delete_product(id: string){
    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});
    return this.http.delete<any>(this.ROOT_URL+'/feed/'+id,{ headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }

  public update_product(id:string, quantity:number){

    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});

    let body = {
      quantity : quantity
    };

    return this.http.patch<any>(this.ROOT_URL+'/feed/:'+id+'?',body,{ headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }

  public get_signedUrl(fileName: string){
    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});

    return this.http.get<any>(this.ROOT_URL+'/feed/signed-url/'+fileName,
    { headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }

  public put_image(file: File, url: string){

    return this.http.put<any>(url,file)
    .pipe(map(res => {
      return res;
    }));
  }

  public add_product(name:string, url:string, quantity:number){

    const headers = new HttpHeaders({'Authorization':localStorage.getItem('accesToken')});

    let body = {
      name: name,
      url: url,
      quantity: 5
    };

    return this.http.post<any>(this.ROOT_URL+'/feed/',body,{ headers: headers })
    .pipe(map(res => {
      return res;
    }));
  }
  
}

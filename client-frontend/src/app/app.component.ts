import { Component } from '@angular/core';
import { ClientService } from './client.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: ClientService){}

  selectedItem: number = -1
  products = []
  email: string = ""

  ngOnInit(){
    this.get_products()
  }

  selectItem(id: number){
    this.selectedItem = id;
  }

  get_products(){
    this.service.get_products()
    .pipe(first()).subscribe(
      res => {
        for (const key in res['rows']) {
          this.products.push(res['rows'][key])
        }
        console.log(this.products[0]);
        
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

  order(){
    this.service.send_order(this.selectedItem,this.email)
    .pipe(first()).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }


}

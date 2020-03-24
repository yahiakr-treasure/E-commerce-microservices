import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service'
import { ProductsService } from '../../services/products.service'
import { first } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {

  constructor(private service: OrdersService,
              private products: ProductsService) { }

  orders = []

  ngOnInit() {
    this.get_orders()
  }

  get_orders(){
    this.service.get_orders()
    .pipe(first()).subscribe(
      res => {
        let order_tmp = []
        for (const key in res['rows']) {
          order_tmp.push(res['rows'][key])
        }
        
        this.products.get_products()
        .pipe(first()).subscribe(
          res => {
            let prods = []
            for (const key in res['rows']) {
              prods.push(res['rows'][key])
            }            
            
            for (const key in order_tmp) {
              let element = prods.find(element => element.id == order_tmp[key].item);
              order_tmp[key].item = element.name
              order_tmp[key].image = element.url
              if(order_tmp[key].state == null) order_tmp[key].state = "pending"
              this.orders.push(order_tmp[key])
            }
            
          },
          err => {
            console.log("Error occured : "+ err);
          }
        );
        
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

  update_order(id: string,state: boolean){
    this.service.update_order(id,state)
    .pipe(first()).subscribe(
      res => {
        console.log(res);
        this.orders.find(element => element.id == id).state = state
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

}

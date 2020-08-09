import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts = [];

  tax = 3.50;

  constructor() { }

  addToCart(product: any){
    this.cartProducts.push(product);
  }

  totalPrice(){
    var price = 0;
    this.cartProducts.forEach(element => {
      price = price + element.price;
    });

    return price + this.tax;
  }
}

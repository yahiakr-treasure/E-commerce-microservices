import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private ROOT_URL = environment.baseUrl;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getImageUrl(imagesUrl){
    var url = this.ROOT_URL + imagesUrl;
    return "url('"+url+"')";
  }

}

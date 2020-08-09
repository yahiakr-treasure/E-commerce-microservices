import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private ROOT_URL = environment.baseUrl;

  private product: any;
  private recomended = [];

  constructor(private activatedRoute: ActivatedRoute,
              private prodductService: ProductsService,
              private cartService: CartService) { }

  async ngOnInit() {

    await this.activatedRoute.params.subscribe(async params => {
      await this.prodductService.findOne(params['id']).then(data => {
        this.product = data;
      })

      await this.prodductService.list(this.product.type).then(data => {
        this.recomended = data.slice(0, 4);;
      })
    });


  }

  getImageUrl(imagesUrl){
    var url = this.ROOT_URL + imagesUrl;
    return "url('"+url+"')";
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}

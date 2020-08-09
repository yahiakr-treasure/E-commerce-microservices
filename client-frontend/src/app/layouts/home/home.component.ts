import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private prodductService: ProductsService) { }

  private flowers = [];
  private plants = [];
  private gifts = [];

  async ngOnInit() {
    
    this.flowers = await this.getProducts("flowers");
    this.plants = await this.getProducts("plants");
    this.gifts = await this.getProducts("gifts");
    
  }

  async getProducts(type: string){
    return await this.prodductService.list(type).then(data => {
      return data.slice(0, 4);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  private ROOT_URL = environment.baseUrl;

  title: string;
  private products = [];

  constructor(private activatedRoute: ActivatedRoute,
              private prodductService: ProductsService) { }

  async ngOnInit() {

    await this.activatedRoute.params.subscribe(async params => {
      this.title = params['type'];

      await this.prodductService.list(this.title).then(data => {
        this.products = data;
      })
    });

  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getImageUrl(imagesUrl){
    var url = this.ROOT_URL + imagesUrl;
    return "url('"+url+"')";
  }

}

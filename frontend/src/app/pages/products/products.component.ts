import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {

  constructor(private service: ProductsService) { }

  products = []
  file : File;
  fileName: string = "Choose an image"
  name: string
  quantity: number

  ngOnInit() {
    this.get_products()
  }

  onFileChanged(event) {
    this.file = event.target.files[0]
    this.fileName = this.file.name
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

  add_product(){
    
    let url: string = ""
    console.log(this.file.name);
    this.service.get_signedUrl(this.file.name)
    .pipe(first()).subscribe(
      res => {
        console.log(res.url);
        this.service.put_image(this.file,res.url)
        .pipe(first()).subscribe(
          res => {
            console.log(res);
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
    
    this.service.add_product(this.name,this.file.name,this.quantity)
    .pipe(first()).subscribe(
      res => {
        console.log(res);
        this.products.push(res)
      },
      err => {
        console.log("Error occured : "+ err);
      }
    );
  }

}

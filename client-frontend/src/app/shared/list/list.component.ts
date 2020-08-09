import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private ROOT_URL = environment.baseUrl;

  @Input() title: string = "Recomended";
  @Input() products = [];

  constructor() { }

  ngOnInit() {
  }

  getImageUrl(imagesUrl){
    var url = this.ROOT_URL + imagesUrl;
    return "url('"+url+"')";
  }

}

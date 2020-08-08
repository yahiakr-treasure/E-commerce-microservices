import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private menu = [
    {name:"Flowers", route:"/catalog/flowers"},
    {name:"Plants", route:"/catalog/plants"},
    {name:"Gifts", route:"/catalog/gifts"},
    {name:"Discounts", route:"/catalog/discounts"},
    {name:"About us", route:"/about"},
  ]

  constructor() { }

  ngOnInit() {
  }

}

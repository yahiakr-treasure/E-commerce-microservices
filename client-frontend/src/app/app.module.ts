import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './layouts/home/home.component';
import { ListComponent } from './shared/list/list.component';
import { ProductComponent } from './layouts/product/product.component';
import { CatalogComponent } from './layouts/catalog/catalog.component';
import { CartComponent } from './shared/cart/cart.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ListComponent,
    ProductComponent,
    CatalogComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ImgShopProductsComponent } from './img-shop-products/img-shop-products.component';
import { CreateArtistComponent } from './user-artist/create-artist/create-artist.component';
import { ListArtistComponent } from './user-artist/list-artist/list-artist.component';
import { ProductListComponent } from './shop-product/product-list/product-list.component';
import { ProductCreateComponent } from './shop-product/product-create/product-create.component';
import { ProductEditComponent } from './shop-product/product-edit/product-edit.component';
import { ProductDetailComponent } from './shop-product/product-detail/product-detail.component';
import { OrderListComponent } from './shop-product/order-list/order-list.component';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  { path: 'home',             component: HomeComponent },
  { path: 'aboutus',             component: AboutusComponent },
  { path: 'nucleoicons',          component: NucleoiconsComponent },
  { path: 'create-artist',          component: CreateArtistComponent },
  { path: 'list-artist', component: ListArtistComponent },
  { path: 'list-product', component: ProductListComponent },
  { path: 'list-order', component: OrderListComponent },
  { path: 'list-product/:id', component: ProductDetailComponent },
  { path: 'create-product',          component: ProductCreateComponent },
  { path: 'img-shop-products',             component: ImgShopProductsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

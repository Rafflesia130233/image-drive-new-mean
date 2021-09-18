import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ImgShopProductsComponent } from './img-shop-products/img-shop-products.component';
import { CreateArtistComponent } from './user-artist/create-artist/create-artist.component';
import { NgbdModalComponent } from './components/modal/modal.component';
import { NgbdModalContent } from './components/modal/modal.component';
import { ListArtistComponent } from './user-artist/list-artist/list-artist.component';
import { ProductCreateComponent } from './shop-product/product-create/product-create.component';
import { ProductEditComponent } from './shop-product/product-edit/product-edit.component';
import { ProductListComponent } from './shop-product/product-list/product-list.component';

import { AuthModule } from './auth/auth.module';
import { ProductDetailComponent } from './shop-product/product-detail/product-detail.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NucleoiconsComponent,
    RegisterComponent,
    ImgShopProductsComponent,
    NgbdModalComponent,
    NgbdModalContent,
    ListArtistComponent,
    CreateArtistComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    AboutusComponent,
    FooterComponent
  ],
  entryComponents: [NgbdModalContent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AuthModule,
    AppRoutingModule

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

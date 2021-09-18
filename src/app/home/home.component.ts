import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from "../service/file-upload.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data : Date = new Date();
  notify: string;
  Products: any = [];
  //filterredImages;
  //galleryFilter = 'all';
  //variables
  selectedData;
  //CategoryProduct: any = ['Drawing', 'Engraving', 'Iconography', 'Painting', 'Sculpture']
  constructor(public fileUploadService: FileUploadService) {
    this.getProducts();
  }

  ngOnInit() {
    // this.route.queryParams.subscribe((params) => {
    //   const key1 = 'loggedin';
    //   if (params[key1] === 'success') {
    //     //this.notify = 'You have been successfully loggedin. Welcome home';
    //   }
    // });
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('home-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  // activeCategory(category) {
  //   this.fileUploadService.getProducts().subscribe((res) => {
  //     this.Products = res['products'];
  //   })
  //   this.galleryFilter = this.CategoryProduct;
  //   if (this.galleryFilter === 'all') {
  //     this.filterredImages = this.Products;
  //   } else {
  //     this.filterredImages = this.Products.filter(x => x.category === this.galleryFilter);
  //   }
  // }
  getProducts() {
    this.fileUploadService.getProducts().subscribe((res) => {
      this.Products = res['products'];
    })
  }
  onSelect(val){

    //value not empty
    if(val!=="all")
    {
        //Data filter method
        this.selectedData = this.Products.filter(x => x.category == val)
    }
    else{
        //for empty selection
        this.selectedData = this.Products;
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../../service/file-upload.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  Products: any = [];

  constructor(public fileUploadService: FileUploadService) {
    this.getProducts();
  }

  ngOnInit() { }

  getProducts() {
    this.fileUploadService.getProducts().subscribe((res) => {
      this.Products = res['products'];
    })
  }
}

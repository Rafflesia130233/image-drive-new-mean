import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../../service/file-upload.service";
import { Product } from 'src/app/model/product';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  model = 1;
  Product: any = [];

  producta: Product;

  //id: any;
  //productDetail: Product | null = null;
  constructor(
    private route: ActivatedRoute,
    private dataService: FileUploadService,
  ) { }
  // constructor(activatedRouter: ActivatedRoute, public dataService: FileUploadService, public router: Router) {
  //   this.id = activatedRouter.snapshot.paramMap.get('id');
  // }

  ngOnInit() {

    //this.productDetail = this.Product.filter(x => x.id === +this.id)[0];

    //this.productDetail = this.dataService.getProductById(this.id).filter(x => x.id === +this.id)[0];

    //const id = this.activatedRouter.snapshot.paramMap.get('id'); //((id)!) helps
    // this.dataService.getProductById(this.id).subscribe((producta) => {
    //   this.producta = producta;
    // });
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getProductById((id)!).subscribe((product) => {
      this.producta = product;
    });
  }

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }

  increase() {
    this.model += 1;
  }
  decrement() {
    if (this.model > 0) {
      this.model -= 1;
    }
  }
}

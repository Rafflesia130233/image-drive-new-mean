import { Router } from '@angular/router';
import { FileUploadService } from "../../service/file-upload.service";
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  preview: string;
  productForm: FormGroup;
  percentDone: any = 0;
  products = [];
  CategoryProduct: any = ['Drawing', 'Engraving', 'Iconography', 'Painting', 'Sculpture']
  closeResult: string;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    // Reactive Form
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: [null]
    })
  }

  ngOnInit(): void {
  }

  updateProduct(e){
    var element = e.target as HTMLSelectElement
    this.productForm?.get('category')?.setValue(element.value, {
      onlySelf: true
    })
  }


  // Image Preview
  uploadFile(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.productForm.patchValue({
      image : file
    });
    this.productForm.get('image')!.value;
    //this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addProduct(
      this.productForm.value.name,
      this.productForm.value.description,
      this.productForm.value.category,
      this.productForm.value.price,
      this.productForm.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.type * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Product successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['products-list'])
      }
    })
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }
}

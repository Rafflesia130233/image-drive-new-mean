import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../../service/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss']
})
export class CreateArtistComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  artists = [];
  closeResult: string;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      address:[''],
      avatar: [null]
    })
  }

  ngOnInit(): void {
  }

  // Image Preview
  uploadFile(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar')!.value;
    //this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addArtist(
      this.form.value.name,
      this.form.value.address,
      this.form.value.avatar
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
          console.log('Artist successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['artists-list'])
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

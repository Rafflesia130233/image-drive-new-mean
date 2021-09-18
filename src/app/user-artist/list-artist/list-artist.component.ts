import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../../service/file-upload.service";

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {

  Artists: any = [];

  constructor(public fileUploadService: FileUploadService) {
    this.getArtists();
  }

  ngOnInit() { }

  getArtists() {
    this.fileUploadService.getArtists().subscribe((res) => {
      this.Artists = res['artists'];
    })
  }
}

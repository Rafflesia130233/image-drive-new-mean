import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../../service/file-upload.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  Orders: any = [];


  constructor(private apiService: FileUploadService) {
    this.readOrders();
  }

  ngOnInit() {
  }

  updateOrder(status, order, i) {
      if (window.confirm('Are you sure?')) {
        const id = order._id;
        order.status = status;
        this.apiService.updateOrder(id, order)
          .subscribe(res => {
            alert('Content updated successfully!');
            this.readOrders();
          }, (error) => {
            console.log(error);
          })
    }
  }


  readOrders() {
    this.apiService.getOrders().subscribe((data) => {
      this.Orders = data;
    });
  }

}

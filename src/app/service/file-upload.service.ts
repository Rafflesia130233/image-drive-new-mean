import { Injectable } from '@angular/core';
import { Artist } from '../model/artist';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseURL = "http://shop-service-fpmxe.ondigitalocean.app/";
  artistUri="http://shop-service-fpmxe.ondigitalocean.app/file-upload"
  ProductUri="http://shop-service-fpmxe.ondigitalocean.app/products"
  orderUri="http://shop-service-fpmxe.ondigitalocean.app/orders"
  headers = new HttpHeaders().set('Content-Type', 'application/json');

 // ProductsAll: any = [];

  constructor(private http: HttpClient) { }

  // Get Artists
  getArtists() {
    return this.http.get(this.artistUri)
  }
  getProducts() {
    return this.http.get(this.ProductUri);
  }
  getProductById(id: String) {
    return this.http.get<Product>(this.ProductUri +'/'+ id);
  }
  getOrders(){
    return this.http.get(`${this.orderUri}`);
  }


  // Create Artist
  addArtist(name: string,address: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("avatar", profileImage);

    return this.http.post<Artist>(`${this.baseURL}file-upload/create-artist`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Create Product
  addProduct(name: string,description: string, category: string, price: number, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", profileImage);

    return this.http.post<Product>(`${this.baseURL}products/create-product`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  createOrder(data): Observable<any> {
    let url = `${this.orderUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  updateOrder(id, data): Observable<any> {
    let url = `${this.orderUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


   // Delete Artist
   deleteArtist(id): Observable<any> {
    let url = `${this.baseURL}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

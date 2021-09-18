import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri:string = 'http://localhost:4000/api';
  productUri:string = 'http://localhost:4000/api/product';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // create
  // createProduct(data): Observable<any> {
  //   let url = `${this.productUri}/create`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // Get all
  // getProducts() {
  //   return this.http.get(`${this.productUri}`);
  // }

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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { Products } from './../models/products.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public API: string = " http://localhost:5000/api/nhomsach";
  constructor(
    public http: HttpClient
  ) { }
  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.API);
  }
}

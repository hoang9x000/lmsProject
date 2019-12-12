import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { Nhomsach } from './../models/productsNhomsach.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsTheloaiService {
  public API: string = " http://localhost:5000/api/nhomsach/";

  constructor(
    public http: HttpClient
  ) { }
  getProductByID( id : number): Observable<Nhomsach[]> {
    return this.http.get<Nhomsach[]>(this.API + id);
  }
}
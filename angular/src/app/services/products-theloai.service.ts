import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import {Products} from './../models/productsTheloai.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsTheloaiService {
  public API : string = " http://localhost:5000/api/theloai";

  constructor(
    public http : HttpClient
  ) { }
  getAllTheloai1() : Observable<Products[]>{
    return this.http.get<Products[]>(this.API);
  }
  getAllTheloai2() : Observable<Products[]>{
    return this.http.get<Products[]>(this.API +"/2");
  }
  getAllTheloai3() : Observable<Products[]>{
    return this.http.get<Products[]>(this.API +"/3");
  }
}

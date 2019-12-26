import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from '../models/user-detail.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  public API : string = "http://localhost:5000/api/user";

  constructor(public http : HttpClient) { }

  getUserDetail(Mathe : string) : Observable<UserDetail> {
    console.log("get user-detail");
    return this.http.get<UserDetail>(this.API+ "/" +Mathe);
  }
}

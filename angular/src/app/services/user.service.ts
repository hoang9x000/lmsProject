import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';
import { Observable } from 'rxjs';
import { PhieumuonAll } from '../models/phieumuon/phieumuonAll.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API: string = " http://localhost:5000/api";
  constructor(private http: HttpClient) { }
  Showphieumuon(mathe: string): Observable<PhieumuonAll[]> {
    return this.http.get<PhieumuonAll[]>(this.API +`/phieumuon`+"/" +mathe);
  }
}

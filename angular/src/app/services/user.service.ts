import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Dattruoc } from './../models/dattruoc.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API: string = " http://localhost:5000/api";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<User[]>(this.API + `/user`);
  }

  getById(id: number) {
    return this.http.get<User>(this.API + `/user/${id}`);
  }
  Adddattruoc(dattruoc: Dattruoc) {
    return this.http.post(this.API + `/dattruoc`, dattruoc);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API: string = " http://localhost:5000/api";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<User[]>(this.API+`/user`);
  }

  getById(id: number) {
    return this.http.get<User>(this.API+`/user/${id}`);
  }
}

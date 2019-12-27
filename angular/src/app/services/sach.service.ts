import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sach } from '../models/sach.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SachService {
  
  public API :string ="http://localhost:5000/api/sach";

  constructor(public http: HttpClient) { }

  getSach(Masach : string) : Observable<Sach>{
    console.log("get-Sach-s");
    return this.http.get<Sach>(this.API+ "/" +Masach);
  }
}

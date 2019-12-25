import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Luotmuon } from '../models/luotmuon.class';
import { Luotmuonpost } from '../models/luotmuonPost.class';

@Injectable({
  providedIn: 'root'
})
export class LuotmuonService {

  public API :string = "http://localhost:5000/api/luotmuon";

  constructor(public http : HttpClient) { }

  getLuotmuon(Mathe : string, Masach: string) : Observable<Luotmuon[]>{
    return this.http.get<Luotmuon[]>(this.API+ "/" +Mathe+ "/" +Masach);
  }

  addLuotmuon(luotmuon: Luotmuonpost) : Observable<Luotmuonpost[]>{
    return this.http.post<Luotmuonpost[]>(this.API,luotmuon);
  }
}

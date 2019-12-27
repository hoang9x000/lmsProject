import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chomuon } from '../models/chomuon.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChomuonService {

  public API :string = "http://localhost:5000/api/phieumuon";

  constructor(public http : HttpClient) { }

  addMuontra(chomuon : Chomuon) : Observable<Chomuon[]>{
    return this.http.post<Chomuon[]>(this.API,chomuon);
  }
}

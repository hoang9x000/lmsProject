import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muontra } from '../models/muontra.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MuontraService {

  // public API2 : string = "http://localhost:3000/User";
  public API :string = "http://localhost:5000/api/phieumuon";

  constructor(
    public http : HttpClient,
  ) { 
    
  }

  getAllMuontra() : Observable<Muontra[]>{
    return this.http.get<Muontra[]>(this.API);
    // return this.http.get<Muontra[]>(this.API2);
  }

  addMuontra(muontra : Muontra) : Observable<Muontra[]>{
    return this.http.post<Muontra[]>(this.API,muontra);
    // return this.http.post<Muontra[]>(this.API2,muontra);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muontra } from '../models/muontra.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MuontraService {

  public API :string = "http://localhost:5000/api/phieumuon";

  constructor(
    public http : HttpClient,
  ) { 
    
  }

  addMuontra(muontra : Muontra) : Observable<Muontra[]>{
    return this.http.post<Muontra[]>(this.API,muontra);
  }

  handleError(err) {
    if(err.error instanceof Error) {
      console.log("Client-side error : ${err.error.message}");
    } else {
      console.log("Server-error : ${err.status}");
    }
  }
}

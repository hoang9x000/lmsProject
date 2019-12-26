import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Muontra } from '../models/muontra.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuontraService {

  public API :string = "http://localhost:5000/api/phieumuon";

  constructor(public http : HttpClient) { }

  getAllMuontra() : Observable<Muontra[]>{
    console.log("get all Muontra");
    return this.http.get<Muontra[]>(this.API);
  }

  updateDatra(muontra : Muontra) : Observable<Muontra[]>{
    console.log("da update");
    return this.http.put<Muontra[]>(this.API +"/"+ muontra.Mathe +"/"+ muontra.Masach,muontra);
    // this.API +"/"+ chomuon.Mathe +"/"+ chomuon.Masach
  }

  handleError(err){
    if(err.error instanceof Error){
      console.log('client-side error : ${err.error.message}');
    }
    else{
      console.log('Server-side error : ${err.status} - ${err.error}');
    }
  }

}

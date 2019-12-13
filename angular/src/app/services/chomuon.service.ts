import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Chomuon } from '../models/chomuon.class';
// import { from } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ChomuonService {
  
  // public API2 : string = "http://localhost:3000/User";
  public API :string = "http://localhost:5000/api/phieumuon";
  

  constructor(public http : HttpClient) { }

  getAllChomuon() : Observable<Chomuon[]>{
    return this.http.get<Chomuon[]>(this.API);
    // return this.http.get<Chomuon[]>(this.API2);
  }

  chanceDatra(chomuon : Chomuon) {
    return this.http.post(this.API+ "/" + chomuon.Mathe +"/"+ chomuon.Masach,chomuon);
  }
  
  updateChomuon() {

  }
  // handleError(err) {
  //   if(err.error instanceof Error){
  //     console.log("Cliernt side error: ${err.error.message}");
  //   } else {
  //     console.log("Server-side error : ${err.status} - ${err.error}");
  //   }

  // }
}

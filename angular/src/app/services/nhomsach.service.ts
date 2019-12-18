import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nhomsach } from './../models/nhomsach.class';

@Injectable({
  providedIn: 'root'
})
export class NhomsachService {
  public API : string = 'http://localhost:5000/api/nhomsach/';

  constructor( private http : HttpClient ) { }

  getAllSach() : Observable<Nhomsach[]>{
    return this.http.get<Nhomsach[]>(this.API);
  }

  getAdd(nhomsach : Nhomsach): Observable<Nhomsach>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post<Nhomsach>(this.API, nhomsach, httpOptions)
 
  }

  getNhomsach(Manhomsach : string ) : Observable<Nhomsach>{
    return this.http.get<Nhomsach>(this.API + Manhomsach)
  }


  deletenhomsach(Manhomsach : string) : Observable<Nhomsach>{
    return this.http.delete<Nhomsach>(this.API + Manhomsach)
  }

  updateNhomsach(nhomsach : Nhomsach) : Observable<Nhomsach>{
    return this.http.put<Nhomsach>(this.API + nhomsach.Manhomsach, nhomsach);
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';
import { Observable } from 'rxjs';
import { DattruocAll } from '../models/dattruocAll.class';

@Injectable({
  providedIn: 'root'
})
export class DattruocService {
  public API: string = " http://localhost:5000/api";
  constructor(private http: HttpClient) { }
  Adddattruoc(mathe:string,masach:string) : Observable<DattruocAll> {
  return this.http.post<DattruocAll>(this.API+`/dattruoc`,{   mathe,masach});
  }
  Showdattruoc(mathe: string): Observable<DattruocAll[]> {
    return this.http.get<DattruocAll[]>(this.API+`/dattruoc` +"/"+ mathe);
  }
}   

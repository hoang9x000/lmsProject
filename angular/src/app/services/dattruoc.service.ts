import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';
import { Observable } from 'rxjs';
import { DattruocAll } from '../models/dattruocAll.class';
import { Dattruoc } from '../models/dattruoc.class';
import { Phieumuon } from '../models/phieumuon/phieumuon.class';

@Injectable({
  providedIn: 'root'
})
export class DattruocService {
  public API: string = " http://localhost:5000/api";
  constructor(private http: HttpClient) { }
  Adddattruoc(mathe: string, masach: string): Observable<DattruocAll> {
    return this.http.post<DattruocAll>(this.API + `/dattruoc`, { mathe, masach });
  }
  Showdattruoc(mathe: string): Observable<DattruocAll[]> {
    return this.http.get<DattruocAll[]>(this.API + `/dattruoc` + "/" + mathe);
  }
  UpdatePhieumuon(phieumuon: Phieumuon): Observable<Phieumuon> {
    phieumuon.Giahan = true;
    console.log(phieumuon.Giahan);
    return this.http.put<Phieumuon>(this.API+`/phieumuon` + `/` + phieumuon.Mathe + `/` + phieumuon.Masach, phieumuon);
  }
  DeleteDattruoc(dattruoc: Dattruoc) {
    console.log(dattruoc);
    return this.http.delete(this.API + `/dattruoc` + `/` + dattruoc.Mathe + `/` + dattruoc.Masach);
  }
}   

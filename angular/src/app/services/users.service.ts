
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './../models/users.class';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public API : string = 'http://localhost:5000/api/user/';
  public API_dk : string = 'http://localhost:5000/api/user/register';
  //public API_dete : string = 'http://localhost:5000/api/user/:Mathe';



  constructor( private http : HttpClient) {

   }



  getAllUsers() : Observable<Users[]>{
    return this.http.get<Users[]>(this.API)
  }

  getAdd(user : Users): Observable<Users>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post<Users>(this.API_dk, user, httpOptions)
 
  }

  getUser(Mathe : string ) : Observable<Users>{
    return this.http.get<Users>(this.API + Mathe)
  }

  deleteuser(Mathe : string) : Observable<Users>{
    return this.http.delete<Users>(this.API + Mathe)
  }


  updateuser(user : Users) : Observable<Users>{
      return this.http.put<Users>(this.API + user.Mathe, user);
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

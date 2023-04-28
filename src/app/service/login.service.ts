import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Login/login'

  constructor(private http: HttpClient) { }

  iniciarSesion(user: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,user);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NecesitaService {

  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Necesita'

  constructor(private http: HttpClient) { }

  getNecesita(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  postNecesita(necesita: any, httpOptions: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl , necesita, httpOptions);
  }

  putNecesita(id: number, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }
  
}

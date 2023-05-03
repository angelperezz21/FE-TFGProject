import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Recurso'

  constructor(private http: HttpClient) { }
  

  getRecurso(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  postRecurso(recurso: any, httpOptions: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, recurso, httpOptions);
  }

  putRecurso(id: number, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  getListRecursos(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaRecursosPublicados');
  }
  
}

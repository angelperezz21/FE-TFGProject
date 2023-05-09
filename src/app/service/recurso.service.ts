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

  solicitarRecurso(idRecurso: number, idBeneficiario: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/solicitarRecurso/' + `${idRecurso}`,{idRecurso,idBeneficiario}, httpOptions);
  }

  aceptarRecurso(idRecurso: number, idBeneficiario: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/aceptarRecurso/' + `${idRecurso}`,{idRecurso,idBeneficiario}, httpOptions);
  }

  getListRecursos(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaRecursosPublicados');
  }

  getMyListRecursos(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaRecursosEmpresa/' + `${id}`);
  }
  
  getNotificaciones(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetNotificaciones/' + `${id}`, httpOptions);
  }

  getMySolicitudesRecursos(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/solicitudesRecursos/' + `${id}`, httpOptions);
  }

  getRecursosNuevos(){
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaRecursosNuevos' );
  }

  uploadPhoto(foto: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/upload', foto);
  }
}

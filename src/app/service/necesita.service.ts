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

  solicitarRecurso(idNecesidad: number, idEmpresa: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/solicitarNecesidad/' + `${idNecesidad}`,{idNecesidad,idEmpresa}, httpOptions);
  }

  aceptarRecurso(idNecesidad: number, idEmpresa: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/aceptarNecesidad/' + `${idNecesidad}`,{idNecesidad,idEmpresa}, httpOptions);
  }

  getListNecesidades(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaNecesidadesPublicadas');
  }

  getMyListNecesidades(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaNecesidadesBeneficiario/' + `${id}`, httpOptions);
  }

  getNotificaciones(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetNotificaciones/' + `${id}`, httpOptions);
  }
  
}

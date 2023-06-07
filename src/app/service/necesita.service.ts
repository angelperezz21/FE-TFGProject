//  <Aplicación destinada a facilitar la colaboraciñón entre Empresas y ONGs>
//   Copyright (C) <2023>  <Ángel Pérez Martín>

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.

//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <https://www.gnu.org/licenses/>. 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NecesitaService {

  private myAppUrl = "https://easydonation.azurewebsites.net/";
  private myApiUrl = 'api/Necesita'

  constructor(private http: HttpClient) { }

  getNecesita(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  postNecesita(necesita: any, httpOptions: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl , necesita, httpOptions);
  }

  deleteNecesita(id: number, httpOptions: any): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  updateNecesita(id: number,necesita: any, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/' + `${id}`, necesita, httpOptions);
  }

  solicitarNecesidad(idNecesidad: number, idEmpresa: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/solicitarNecesidad/' + `${idNecesidad}`,{idNecesidad,idEmpresa}, httpOptions);
  }

  aceptarNecesidad(idNecesidad: number, idEmpresa: number,httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/aceptarNecesidad/' + `${idNecesidad}`,{idNecesidad,idEmpresa}, httpOptions);
  }

  getListNecesidades(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaNecesidadesPublicadas');
  }

  getMyListNecesidades(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaNecesidadesBeneficiario/' + `${id}`);
  }

  getNotificaciones(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetNotificaciones/' + `${id}`, httpOptions);
  }

  getMySolicitudesNecesitas(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/solicitudesNecesitas/' + `${id}`, httpOptions);
  }

  getNecesidadesNuevas(){
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaNecesidadesNuevas' );
  }

  uploadPhoto(foto: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/upload', foto);
  }
  
}

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
//   in the LICENSE.txt file.  If not, see <https://www.gnu.org/licenses/>. 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private myAppUrl = "https://easydonation.azurewebsites.net/";
  private myApiUrl = 'api/Recurso'

  constructor(private http: HttpClient) { }
  

  getRecurso(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  postRecurso(recurso: any, httpOptions: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, recurso, httpOptions);
  }

  deleteRecurso(id: number, httpOptions: any): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  updateRecurso(id: number,recurso: any, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/' + `${id}`, recurso, httpOptions);
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

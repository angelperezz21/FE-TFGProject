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
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  @Output() disparadorNotificaciones = new EventEmitter<any>();
  @Output() disparador = new EventEmitter<any>();

  private myAppUrl = "https://easydonation.azurewebsites.net/";
  private myApiUrl = 'api/Empresa'

  constructor(private http: HttpClient) { }

  registro(empresa: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/register', empresa);
  }

  deleteEmpresa(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getEmpresa(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  getPerfilEmpresa(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/empresaPerfil/' + `${id}`);
  }

  updateEmpresa(id: number, empresa: any, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/update/' + `${id}`, empresa, httpOptions);
  }

  contrasenyaEmpresa(email: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/recuperarContrasenya/' + `${email}`);
  }

  getListaEmpresas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaEmpresas');
  }

  seguirBeneficiario(idBeneficiario: number, idEmpresa: number,  httpOptions: any): Observable<any>{
    const body = { idBeneficiario,idEmpresa };
    return this.http.post(this.myAppUrl + this.myApiUrl + '/seguirBeneficiario', body, httpOptions)
  }

  unfollowBeneficiario(idBeneficiario: number, idEmpresa: number,  httpOptions: any): Observable<any>{
    const body = { idBeneficiario, idEmpresa};
    return this.http.post(this.myAppUrl + this.myApiUrl + '/dejarSeguirBeneficiario', body, httpOptions)
  }

  getListaSeguidos(idEmpresa: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaBeneficiariosSeguidos/' + `${idEmpresa}`, httpOptions);
  }

  getNotificaciones(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/Notificaciones/' + `${id}`, httpOptions);
  }

  uploadPhoto(foto: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/upload', foto);
  }

  getTotalEmpresas():Observable <any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/empresasTotales')
  }

  getDonaciones(idEmpresa: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaDonaciones/' + `${idEmpresa}`, httpOptions);
  }
  
  getDonacionesPendientes(idEmpresa: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaDonacionesPendientes/' + `${idEmpresa}`, httpOptions);
  }
  
 
}

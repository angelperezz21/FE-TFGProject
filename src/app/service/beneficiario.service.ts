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
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  @Output() disparadorNotificaciones = new EventEmitter<any>();
  @Output() disparador = new EventEmitter<any>();
  
  private myAppUrl = "https://easydonation.azurewebsites.net/";
  private myApiUrl = 'api/Beneficiario'

  constructor(private http: HttpClient) { }

  registro(beneficiario: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/register', beneficiario);
  }

  deleteBeneficiario(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getBeneficiario(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/' + `${id}`, httpOptions);
  }

  getPerfilBeneficiario(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/beneficiarioPerfil/' + `${id}`);
  }

  updateBeneficiario(id: number, beneficiario: any, httpOptions: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/update', beneficiario, httpOptions);
  }

  contrasenyaBeneficiario(email: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/recuperarContrasenya/' + `${email}`);
  }

  getListaBeneficiarios(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaBeneficiarios');
  }

  seguirEmpresa(idEmpresa: number, idBeneficiario: number,  httpOptions: any): Observable<any>{
    const body = { idEmpresa, idBeneficiario};
    return this.http.post(this.myAppUrl + this.myApiUrl + '/seguirEmpresa', body, httpOptions)
  }

  unfollowEmpresa(idEmpresa: number, idBeneficiario: number,  httpOptions: any): Observable<any>{
    const body = { idEmpresa, idBeneficiario};
    return this.http.post(this.myAppUrl + this.myApiUrl + '/dejarSeguirEmpresa', body, httpOptions)
  }

  getListaSeguidos(idBeneficiario: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaEmpresasSeguidos/' + `${idBeneficiario}`, httpOptions);
  }

  getNotificaciones(id: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/Notificaciones/' + `${id}`, httpOptions);
  }

  uploadPhoto(foto: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/upload', foto);
  }

  getTotalBeneficiarios():Observable <any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/beneficiariosTotales')
  }

  getDonaciones(idBeneficiario: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaDonaciones/' + `${idBeneficiario}`, httpOptions);
  }
  
  getDonacionesPendientes(idBeneficiario: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/listaDonacionesPendientes/' + `${idBeneficiario}`, httpOptions);
  }
}

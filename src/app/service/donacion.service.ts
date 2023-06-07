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
export class DonacionService {

  private myAppUrl = "https://easydonation.azurewebsites.net/";
  private myApiUrl = 'api/Donacion'

  constructor(private http: HttpClient) { }

  getCertificado(idDonacion: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/certificado/' + `${idDonacion}`, httpOptions);
  }

  getDonacion(idDonacion: number, httpOptions: any): Observable<any>{    
    const url = `${this.myAppUrl}${this.myApiUrl}/${idDonacion}`;
    return this.http.get(url, httpOptions);
  }

  getTotalDonaciones():Observable <any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/donacionesTotales')
  }

  envioDonacion(idDonacion: number, httpOptions: any): Observable<any>{    
    return this.http.put(this.myAppUrl + this.myApiUrl + '/envioDonacion/' + `${idDonacion}`,idDonacion ,httpOptions);
  }

  recibirDonacion(idDonacion: number, httpOptions: any): Observable<any>{    
    return this.http.put(this.myAppUrl + this.myApiUrl + '/recibirDonacion/' + `${idDonacion}`, idDonacion,httpOptions);
  }

}

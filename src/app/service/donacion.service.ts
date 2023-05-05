import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Donacion'

  constructor(private http: HttpClient) { }

  getCertificado(idDonacion: number, httpOptions: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/certificado/' + `${idDonacion}`, httpOptions);
  }

  getDonacion(idDonacion: number, httpOptions: any): Observable<any>{    
    const url = `${this.myAppUrl}${this.myApiUrl}/${idDonacion}`;
    return this.http.get(url, httpOptions);
  }
}

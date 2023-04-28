import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Beneficiario/register'

  constructor(private http: HttpClient) { }

  registro(beneficiario: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, beneficiario);
  }
}

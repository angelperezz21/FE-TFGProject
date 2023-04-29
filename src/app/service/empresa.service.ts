import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  private myAppUrl = "https://localhost:44318/";
  private myApiUrl = 'api/Empresa/'

  constructor(private http: HttpClient) { }

  registro(empresa: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + 'register', empresa);
  }

  deleteEmpresa(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getEmpresa(id: number, httpOptions: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`, httpOptions);
  }

  contrasenyaEmpresa(email: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'recuperarContrasenya/' + `${email}`);
  }

  getListaEmpresas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'listaEmpresas');
  }
 
}

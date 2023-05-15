import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  @Output() disparadorNotificaciones = new EventEmitter<any>();
  @Output() disparador = new EventEmitter<any>();
  
  private myAppUrl = "https://localhost:44318/";
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

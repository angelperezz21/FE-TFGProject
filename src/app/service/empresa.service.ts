import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  @Output() disparadorNotificaciones = new EventEmitter<any>();
  @Output() disparador = new EventEmitter<any>();

  private myAppUrl = "https://localhost:44318/";
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

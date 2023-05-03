import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  private readonly API_URL = 'https://serviciosweb.registradores.org/api/v1/cif/'

  constructor(private http: HttpClient) { }

  verificarEmpresaPorCIF(cif: string) {
    const url = `${this.API_URL}${cif}`;
    return this.http.get(url);
  }
}

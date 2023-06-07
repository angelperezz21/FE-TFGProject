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
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { DonacionService } from 'src/app/service/donacion.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-listar-donaciones',
  templateUrl: './listar-donaciones.component.html',
  styleUrls: ['./listar-donaciones.component.css']
})
export class ListarDonacionesComponent implements OnInit{
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  donaciones: any;
  donacionesPendientes: any;
  page!:number;

  constructor(private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService,
    private _donacionService: DonacionService    ) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        
      }
    }
    this.obtenerDonaciones();
    this.obtenerDonacionesPendientes();    
  }

  obtenerDonaciones(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.getDonaciones(this.id,{headers}).subscribe(data=>{
        this.donaciones = data;
      })}}
    else{      
      if(this.id!=null){this._empresaService.getDonaciones(this.id,{headers}).subscribe(data=>{
        this.donaciones = data;
      })}}
  }

  obtenerDonacionesPendientes(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.getDonacionesPendientes(this.id,{headers}).subscribe(data=>{        
        this.donacionesPendientes = data;
      })}}
    else{      
      if(this.id!=null){this._empresaService.getDonacionesPendientes(this.id,{headers}).subscribe(data=>{
        this.donacionesPendientes = data;
      })}}  
  }

  clickBoton(donacionId: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    if(this.role==='Beneficiario'){    
        this._donacionService.recibirDonacion(donacionId,{headers}).subscribe(data=>{        
        this.obtenerDonacionesPendientes();
        this.obtenerDonaciones();   
      })}
    else{      
        this._donacionService.envioDonacion(donacionId,{headers}).subscribe(data=>{
          this.obtenerDonacionesPendientes();     
          this.obtenerDonaciones();  
      })}
      
  }

   verCertificado(donacionId: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._donacionService.getCertificado(donacionId,{headers: headers}).subscribe(async (data)=>{    

        const response = await fetch('https://easydonation.azurewebsites.net/' + data.certificadoPath);
        const blob = await response.blob();
        const urlArchivo = URL.createObjectURL(blob);
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = urlArchivo;
        enlaceDescarga.download = 'Certificado.pdf';
        enlaceDescarga.click();
        URL.revokeObjectURL(urlArchivo);
    })
  }
}

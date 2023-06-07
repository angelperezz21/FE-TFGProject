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
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-listar-seguidos',
  templateUrl: './listar-seguidos.component.html',
  styleUrls: ['./listar-seguidos.component.css']
})
export class ListarSeguidosComponent implements OnInit{
  empresas: any;
  seguidos: any;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  page!:number;

  constructor( private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService    ) {
  }

  ngOnInit(): void {
    this.obtenerMisSeguidos();
    console.log("pulso")
  }

  
  obtenerMisSeguidos() {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        
      }
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
        this.seguidos = data;
      })}}
    else{      
      if(this.id!=null){this._empresaService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
        this.seguidos = data;
      })}}
    
  }

  dejarSeguir(idSeguido: number ){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(idSeguido)
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.unfollowEmpresa(idSeguido,this.id,{headers}).subscribe(data=>{
          if(this.id!=null)this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
            this.seguidos = data;
          })
      })}
    }
    else{      
      if(this.id!=null){this._empresaService.unfollowBeneficiario(idSeguido,this.id,{headers}).subscribe(data=>{
          if(this.id!=null)this._empresaService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
            this.seguidos = data;
          })
      })}
    }
    
  }

  enviarSeguido(seguidoId: number){
    if(this.role==='Empresa')window.location.href="/Beneficiario/" + seguidoId;
    if(this.role==='Beneficiario')window.location.href="/Empresa/" + seguidoId;
    
  }


}


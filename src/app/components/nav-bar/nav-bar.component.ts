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
import { JwtHelperService, JwtModule }from '@auth0/angular-jwt'
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role!: string;
  numNotificaciones!: number

  constructor(private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService) {
    
  }

  ngDoCheck() {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;           
      }
    }
    this.logged = token !== "";
    
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){      
      if(token!==""){                
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
        if(this.helper.decodeToken(token).role==='Empresa'){
          this._empresaService.getNotificaciones(this.helper.decodeToken(token).unique_name, {headers}).subscribe(data=>{
            console.log("hola")
            console.log(data)
            this.numNotificaciones =data;
          })
        }else{          
          this._beneficiarioService.getNotificaciones(this.helper.decodeToken(token).unique_name, {headers}).subscribe(data=>{
            this.numNotificaciones =data;
          })
        }
        this._empresaService.disparadorNotificaciones.subscribe(data=>{
          this.numNotificaciones = data;
        })
        this._beneficiarioService.disparadorNotificaciones.subscribe(data=>{
          this.numNotificaciones = data;
        })
      }
    }
    
  }

  cerrarSesion(){
    localStorage.setItem('token',"")
    window.location.reload();
    window.location.href='/Inicio';
  }
}

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
//   in the LICENSE.txt file.  If not, see <https://www.gnu.org/licenses/>. 
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarNecesidadesService } from 'src/app/service/listar-necesidades.service';
import { NecesitaService } from 'src/app/service/necesita.service';

@Component({
  selector: 'app-listar-mis-necesidades',
  templateUrl: './listar-mis-necesidades.component.html',
  styleUrls: ['./listar-mis-necesidades.component.css']
})
export class ListarMisNecesidadesComponent implements OnInit{
  necesidades: any;  
  tokenId: any;
  helper = new JwtHelperService();
  id: any;
  role: any;
  logged = false;
  isModalOpen = false;
  solicitantes: any;
  empresa: any;
  necesidadId!: number;
  hoveredId: number | null = null;
  page!: number;
/**
 *
 */
  constructor(private _serviceListarNecesidades: ListarNecesidadesService,
    private _necesidadService: NecesitaService ) {
  }

  ngOnInit(): void {
    this.obtenerNecesidades();
    
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

  onCardMouseEnter(necesidadId: number): void {
    this.hoveredId = necesidadId;
  }

  onCardMouseLeave(): void {
    this.hoveredId = null;
  }
  
  
  onDropdownChange(selectedValue: any) {
    console.log(selectedValue?.target.value)
    this.empresa = selectedValue?.target.value;
  }

  openModal(idNecesidad: number) {
    this.isModalOpen = true;
    this.necesidadId = idNecesidad;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._necesidadService.getNotificaciones(idNecesidad,{headers} ).subscribe(data=>{
      this.solicitantes = data;  
      this.empresa = data[0]['id'];
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  obtenerNecesidades(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(token!==null){
      this._necesidadService.getMyListNecesidades(this.helper.decodeToken(token).unique_name).subscribe(data=>{
        this.necesidades=data;
        this.necesidades.sort((a:any, b:any) => {
          return new Date(b.fechaCreacionNecesita).getTime() - new Date(a.fechaCreacionNecesita).getTime();
        });             
      })
    }
  }

  aceptarNecesidad(){    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.empresa)
    this._necesidadService.aceptarNecesidad(this.necesidadId,this.empresa,{headers}).subscribe(data=>{
      this.obtenerNecesidades();
    });
   
  }

  verNecesidad(necesidad: any) {
    if(necesidad.estado!==2){
      window.location.href='/Necesita/' +necesidad.id;
    }    
  }


}

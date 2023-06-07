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
import { ListarRecursosService } from 'src/app/service/listar-recursos.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-listar-mis-recursos',
  templateUrl: './listar-mis-recursos.component.html',
  styleUrls: ['./listar-mis-recursos.component.css']
})
export class ListarMisRecursosComponent implements OnInit{
  recursos: any;  
  tokenId: any;
  helper = new JwtHelperService();
  id: any;
  role: any;
  logged = false;
  isModalOpen = false;
  solicitantes: any;
  beneficiario: any;
  recursoId!: number;  
  hoveredId: number | null = null;
  page!: number;
/**
 *
 */
  constructor(private _serviceListarRecursos: ListarRecursosService,
    private _recursoService: RecursoService ) {
  }

  ngOnInit(): void {
    this.obtenerRecursos();
    
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


  onCardMouseEnter(recursoId: number): void {
    this.hoveredId = recursoId;
  }

  onCardMouseLeave(): void {
    this.hoveredId = null;
  }
  
  onDropdownChange(selectedValue: any) {
    console.log(selectedValue?.target.value)
    this.beneficiario = selectedValue?.target.value;
  }

  openModal(idRecurso: number) {
    this.isModalOpen = true;
    this.recursoId = idRecurso;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.getNotificaciones(idRecurso,{headers} ).subscribe(data=>{
      this.solicitantes = data;  
      this.beneficiario = data[0]['id'];
    })
  }

  verRecurso(recurso: any) {
    if(recurso.estado!==2){
      window.location.href='/Recurso/' +recurso.id;
    }    
  }

  closeModal() {
    this.isModalOpen = false;
  }

  obtenerRecursos(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(token!==null){
      this._recursoService.getMyListRecursos(this.helper.decodeToken(token).unique_name).subscribe(data=>{
        this.recursos=data;   
        this.recursos.sort((a:any, b:any) => {
          return new Date(b.fechaCreacionRecurso).getTime() - new Date(a.fechaCreacionRecurso).getTime();
        });
      })
    }
  }
  

  aceptarRecurso(){    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.beneficiario)
    this._recursoService.aceptarRecurso(this.recursoId,this.beneficiario,{headers}).subscribe(data=>{
      this.obtenerRecursos();
    });
   
  }



}

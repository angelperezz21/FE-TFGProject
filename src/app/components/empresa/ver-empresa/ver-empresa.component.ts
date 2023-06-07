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
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmpresaService } from 'src/app/service/empresa.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})
export class VerEmpresaComponent implements OnInit{
  id!: number;
  empresa: any;
  recursos: any;
  tokenId: any;
  helper = new JwtHelperService();  
  role: any;
  logged = false;
  idVisitante: any;
  recursosSolicitados: any;
  hoveredId: number | null = null;
  page!: number;
  
  constructor(private _empresasService: EmpresaService,
    private  _recursoService: RecursoService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._empresasService.getPerfilEmpresa(this.id).subscribe(data=>{      
      this.empresa = data;      
    })

    this._recursoService.getMyListRecursos(this.id).subscribe(data=>{
      data.forEach((element: any) => {
        if(element.estado===1){
          if (this.recursos === undefined) {
            this.recursos = []; // Inicializa la variable si es undefined
          }
          this.recursos.push(element)
        }
      });
      this.recursos.sort((a:any, b:any) => {
        return new Date(b.fechaCreacionRecurso).getTime() - new Date(a.fechaCreacionRecurso).getTime();
      });
    })

    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.idVisitante = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        this.misRecursosSolicitados();
      }
    }
    this.logged = token !== "";
  }

  ngDoCheck() {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.idVisitante = this.tokenId.unique_name;
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


  recursoSolicitado(recurso: any): boolean {        
    return this.recursosSolicitados.some((x: any) => x.id === recurso.id);    
  }

  solicitarRecurso(idRecurso: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.solicitarRecurso(idRecurso,this.idVisitante,{headers}).subscribe(data=>{
      this.misRecursosSolicitados();
    });
  }

  tiempo(fecha: Date): string{
    var diferenciaMs = new Date().getTime() - new Date(fecha).getTime();
    var diferencia = Math.floor(diferenciaMs / (1000 * 60)) + " minutos" ;
    const minutos = Math.floor(diferenciaMs / (1000 * 60));
    if(minutos>60) {      
      const horas = Math.floor(minutos / 60);
      diferencia = horas + " horas";
      if(horas>24){
        diferencia = Math.floor(horas / 24) + " días";
      }
    }
    return diferencia;
  }


  misRecursosSolicitados(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this._recursoService.getMySolicitudesRecursos(this.idVisitante,{headers}).subscribe(data=>{      
      this.recursosSolicitados = data;
      //this.misRecursosSolicitados();
    })
  }

}

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
  selector: 'app-listar-necesita',
  templateUrl: './listar-necesita.component.html',
  styleUrls: ['./listar-necesita.component.css']
})
export class ListarNecesitaComponent implements OnInit{
  necesita: any;
  necesidadFiltro: any;
  tokenId: any;
  id: any;
  role: any;
  helper = new JwtHelperService();
  logged=false;
  necesidades: any;
  necesidadesSolicitados: any;  
  tipoOrden!: string;
  hoveredId: number | null = null;
  page!: number;
  metodos: any = [];

  constructor(private _serviceListarNecesidades: ListarNecesidadesService,
      private _necesitaService: NecesitaService ) {
  }

  ngOnInit(): void {
    this._serviceListarNecesidades.disparador.subscribe(data=>{
      this.aplicarFiltros(data.nombre,parseInt(data.precioMin), parseInt(data.precioMax),data.cantidad,data.metodo, data.orden);
    })
    this.obtenerNecesidades();

    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        this.misNecesidadesSolicitadas();
      }
    }
    this.logged = token !== "";
  }

  necesidadSolicitado(necesidad: any): boolean {        
    return this.necesidadesSolicitados.some((x: any) => x.id === necesidad.id);    
  }

  onCardMouseEnter(necesidadId: number): void {
    this.hoveredId = necesidadId;
  }

  onCardMouseLeave(): void {
    this.hoveredId = null;
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

  obtenerNecesidades(){
    this._necesitaService.getListNecesidades().subscribe(data=>{
      
      this.necesita=data;      
      this.necesidadFiltro = data;
      this.necesidadFiltro.sort((a:any, b:any) => {
        return new Date(b.fechaCreacionNecesita).getTime() - new Date(a.fechaCreacionNecesita).getTime();
      });
      console.log(data)
      
    })
  }

  solicitarNecesidad(idNecesidad: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._necesitaService.solicitarNecesidad(idNecesidad,this.id,{headers}).subscribe(data=>{
      this.misNecesidadesSolicitadas();
    });
  }

  misNecesidadesSolicitadas(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this._necesitaService.getMySolicitudesNecesitas(this.id,{headers}).subscribe(data=>{      
      this.necesidadesSolicitados = data;
      //this.misRecursosSolicitados();
    })
  }

  //nombre,precioMin,precioMax,cantidad,orden
  aplicarFiltros(nombre:string,precioMin: number,precioMax:number, cantidad:string, metodo:any, orden:string){

    this.tipoOrden = orden;
    this.metodos = metodo;
    
    this.necesidadFiltro = this.necesita.filter((necesita : any) => 
  { 
    const precioR = parseInt(necesita.precio);    
    const cantidadR = necesita.cantidad.toString();
    const nombreR = necesita.nombre?.toLowerCase();  
    const metodoR = necesita.metodoEntrega?.toLowerCase(); 

    if(this.tipoOrden!=="0"){
      this.necesita.sort((a : any, b :any) => {
        if (this.tipoOrden === "1") {
          return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
        } else if(this.tipoOrden === "-1"){
          return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase());
        }else if(this.tipoOrden === "2"){
          return  parseInt(b.precio) - parseInt(a.precio);
        }else if(this.tipoOrden === "-2"){
          return  parseInt(a.precio) - parseInt(b.precio);
        }
      });    
    }

    const nombreValido = nombre ? nombreR.includes(nombre) : true;
    const cantidadValida = cantidad ? cantidadR === (cantidad) : true;    
    const metodoValido = this.metodos!==undefined && this.metodos.length>0 ? this.metodos.includes(metodoR) : true;
    const precioValido = (precioMin!==0 && !Number.isNaN(precioMin))|| (precioMax!=10000 && !Number.isNaN(precioMin)) ? precioMin <= precioR && precioMax >=precioR : true;
    
    return metodoValido && nombreValido && cantidadValida && precioValido ;
  } );
  } 
}

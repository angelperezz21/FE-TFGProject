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
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { Router } from '@angular/router';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import { BeneficiarioService } from 'src/app/service/beneficiario.service';
  import { EmpresaService } from 'src/app/service/empresa.service';
  import { CategoriaValue } from 'src/app/shared/categoria.module';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {
  empresas: any;
  empresasFiltro: any;
  seguidos: any;
  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  dropdownValues = CategoriaValue.values;
  categoria: any = [];
  form: FormGroup;  
  rangoMin!: number;
  rangoMax!: number;
  tipoOrden!: string;
  page!: number;

  constructor( private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService,
    private fb: FormBuilder) {

      this.form = this.fb.group({
        nombre: ['',],
        empresasSeguidas: ['', ],
        ubi: ['',],
      })

   }  

  ngOnInit(): void {
    this.obtenerEmpresas();
    this.obtenerMisSeguidos();

    this._empresaService.disparador.subscribe(data=>{
      this.aplicarFiltros(data.nombre,data.ubi,data.followed,data.categoriaDisp,data.orden);
    })

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
    if(this.role==='Beneficiario'){
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    if(this.id!=null){this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
      this.seguidos = data;
    })}}
    
  }

  empresaSeguida(empresa: any): boolean {    
    return this.seguidos.some((x: any) => x.nombre === empresa.nombre);
    
  }

  dejarSeguir(idEmpresa: number ){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.id!=null){this._beneficiarioService.unfollowEmpresa(idEmpresa,this.id,{headers}).subscribe(data=>{
      this.obtenerMisSeguidos();
    })}
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

  seguir(idEmpresa:number){      
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.id!=null){this._beneficiarioService.seguirEmpresa(idEmpresa,this.id,{headers}).subscribe(data=>{
      this.obtenerMisSeguidos()
    })}    
  }

  obtenerEmpresas(){
    this._empresaService.getListaEmpresas().subscribe(data=>{      
      this.empresas=data;
      this.empresasFiltro = data;      
    })
  }


  aplicarFiltros(nombre:string,ubi:string,followed:string, categoriaD: any, orden:string){
  
    this.categoria =categoriaD
    this.tipoOrden = orden;

    console.log(this.categoria)

  this.empresasFiltro = this.empresas.filter((empresa : any) => 
  { 
    const categoriaE = empresa.categoria?.toLowerCase();
    const ubicacionE = empresa.direccion?.toLowerCase();
    const nombreE = empresa.nombre?.toLowerCase();

    if(this.tipoOrden!=="0"){
      this.empresas.sort((a : any, b :any) => {
        if (this.tipoOrden === "1") {
          return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
        } else if(this.tipoOrden === "-1"){
          return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase());
        }      
      });    
    }

    const categoriaValida = this.categoria!==undefined && this.categoria.length>0 ? this.categoria.includes(categoriaE) : true;
    const ubicacionValida = ubi ? ubicacionE.includes(ubi) : true;
    const nombreValido = nombre ? nombreE.includes(nombre) : true;
    const seguidosValido = followed ? this.seguidos.some((x: any) => x.nombre === empresa.nombre) : true;
  
    console.log(categoriaValida && ubicacionValida && nombreValido && seguidosValido)
    return  categoriaValida && ubicacionValida && nombreValido && seguidosValido;
  } );
  }
  
  enviarEmpresa(empresaId: number){
    window.location.href="/Empresa/" + empresaId;
  }


}

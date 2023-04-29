import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {
  empresas: any;
  seguidos: any;
  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  
  constructor( private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService) {

   }

  ngOnInit(): void {
    this.obtenerEmpresas();
    this.obtenerMisSeguidos();
    
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
    
    if(this.id!=null){this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
      this.seguidos = data;
    })}
  }

  empresaSeguida(empresa: any): boolean {
    console.log("hola")
    return this.seguidos.some((data: { nombre: any; }) =>{ data.nombre === empresa.nombre;});
  }

  dejarSeguir(idEmpresa: number ){

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
    console.log(idEmpresa)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.id!=null){this._beneficiarioService.seguirEmpresa(idEmpresa,this.id,{headers}).subscribe(data=>{
      console.log(data)
    })}
  }

  obtenerEmpresas(){
    this._empresaService.getListaEmpresas().subscribe(data=>{
      this.empresas=data;
    })

  }
 
}

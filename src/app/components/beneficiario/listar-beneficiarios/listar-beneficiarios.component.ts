import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';

@Component({
  selector: 'app-listar-beneficiarios',
  templateUrl: './listar-beneficiarios.component.html',
  styleUrls: ['./listar-beneficiarios.component.css']
})
export class ListarBeneficiariosComponent {
  beneficiarios: any;
  beneficiariosFiltro: any;
  seguidos: any;
  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  dropdownValues = CategoriaValue.values;
  categoria: any = [];
  form: FormGroup;  
  tipoOrden: any;  
  page!: number;
  
  constructor( private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService,
    private fb: FormBuilder) {

      this.form = this.fb.group({
        nombre: ['',],
        beneficiariosSeguidas: ['', ],
        ubi: ['',],
      })
   }

  ngOnInit(): void {
    this.obtenerBeneficiarios();
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
    if(this.role==='Empresa'){
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
      if(this.id!=null){this._empresaService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
        this.seguidos = data;
      })}
    }
    
  }

  beneficiarioSeguido(beneficiario: any): boolean {    
    return this.seguidos.some((x: any) => x.nombre === beneficiario.nombre);
    
  }

  dejarSeguir(idBeneficiario: number ){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.id!=null){this._empresaService.unfollowBeneficiario(idBeneficiario,this.id,{headers}).subscribe(data=>{
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

  seguir(idBeneficiario:number){      
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.id!=null){this._empresaService.seguirBeneficiario(idBeneficiario,this.id,{headers}).subscribe(data=>{
      this.obtenerMisSeguidos();  
    })}    
  }

  obtenerBeneficiarios(){
    this._beneficiarioService.getListaBeneficiarios().subscribe(data=>{
      this.beneficiarios=data;
      this.beneficiariosFiltro = data;
      
    })
  }


   
  applyFilter(event: Event) {

  var nombre =this.form.get('nombre')?.value;
  var ubi = this.form.get('ubi')?.value
  var followed = this.form.get('beneficiariosSeguidas')?.value
  this.beneficiariosFiltro = this.beneficiarios.filter((beneficiario : any) => 
  { 
    const categoriaE = beneficiario.categoria?.toLowerCase();
    const ubicacionE = beneficiario.direccion?.toLowerCase();
    const nombreE = beneficiario.nombre?.toLowerCase();
  
    if(this.tipoOrden!=="0"){
      this.beneficiarios.sort((a : any, b :any) => {
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
    const seguidosValido = followed ? this.seguidos.some((x: any) => x.nombre === beneficiario.nombre) : true;
  
    return categoriaValida && ubicacionValida && nombreValido && seguidosValido;
  } );
  }

  
  enviarBeneficiario(beneficiarioId: number){
    window.location.href="/Beneficiario/" + beneficiarioId;
  }



}

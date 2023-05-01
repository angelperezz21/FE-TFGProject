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
  categoria: string | undefined;
  form: FormGroup;  
  
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
      console.log(data)
    })}

    window.location.reload();
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
      console.log(data)
    })}
    window.location.reload();
  }

  obtenerEmpresas(){
    this._empresaService.getListaEmpresas().subscribe(data=>{
      this.empresas=data;
      this.empresasFiltro = data;
      
    })
  }

  onDropdownChange(selectedValue: any) {
    this.categoria = this.dropdownValues.find(value => value.id+"" === selectedValue?.target.value)?.name;    
  }
   
  applyFilter(event: Event) {
  var nombre =this.form.get('nombre')?.value;
  var ubi = this.form.get('ubi')?.value
  var followed = this.form.get('empresasSeguidas')?.value
  this.empresasFiltro = this.empresas.filter((empresa : any) => 
  { 
    const categoriaE = empresa.categoria?.toLowerCase();
    const ubicacionE = empresa.direccion?.toLowerCase();
    const nombreE = empresa.nombre?.toLowerCase();

    console.log(this.categoria)
    console.log(categoriaE)
  
    const categoriaValida = this.categoria ? categoriaE.includes(this.categoria.toLowerCase()) : true;
    const ubicacionValida = ubi ? ubicacionE.includes(ubi) : true;
    const nombreValido = nombre ? nombreE.includes(nombre) : true;
    const seguidosValido = followed ? this.seguidos.some((x: any) => x.nombre === empresa.nombre) : true;
  
    return categoriaValida && ubicacionValida && nombreValido && seguidosValido;
  } );
  }

  
 
}

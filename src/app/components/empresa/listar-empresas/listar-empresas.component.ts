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

    // const range1 = document.getElementById("customRange1") as HTMLInputElement;
    // const range2 = document.getElementById("customRange2") as HTMLInputElement;
    // const rangeValue1 = document.getElementById("rangeValue1") as HTMLParagraphElement;
    // const rangeValue2 = document.getElementById("rangeValue2") as HTMLParagraphElement;
        
    // let rangoMin = 0; // establecer el valor mínimo del segundo rango
    
    // // función que se ejecuta cuando se cambia el valor de los rangos
    // function setRanges() {
    //   const minRange1 = parseFloat(range1.value);
    //   const maxRange2 = parseFloat(range2.value);
    
    //   // actualiza el valor mínimo del segundo rango
    //   range2.min = minRange1.toString();
    //   rangoMin = minRange1;
    
    //   // actualiza el valor máximo del primer rango
    //   range1.max = maxRange2.toString();
    
    //   // muestra el valor actual de cada rango en los elementos p correspondientes
    //   rangeValue1.textContent = `Valor: ${range1.value}`;
    //   rangeValue2.textContent = `Valor: ${range2.value}`;
    // }
    
    // range1.addEventListener("input", setRanges);
    // range2.addEventListener("input", setRanges);
    
    // // muestra los valores iniciales de los rangos en los elementos p correspondientes
    // rangeValue1.textContent = `Min: ${range1.value} €` ;
    // rangeValue2.textContent = `Max: ${range2.value} €`;
    

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
    console.log(this.tipoOrden!=="0")

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
  
    return  categoriaValida && ubicacionValida && nombreValido && seguidosValido;
  } );
  }


  
  
}

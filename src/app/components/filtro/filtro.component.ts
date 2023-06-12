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
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';
import { CategoriaONGValue } from 'src/app/shared/categoriaONG.module';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit{
  form: any;
  dropdownValues = CategoriaValue.values;
  categoria: any = [];
  isSeguidosOpen = false;
  isOrdenarOpen = false;
  isDropdownOpen = false;
  isNombreOpen = false;
  isUbiOpen = false;
  tipoOrden: any;  
  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  route!: string;

  constructor(private fb: FormBuilder,
    private _empresa: EmpresaService,
    private _beneficiario: BeneficiarioService,
    private router: Router,
    private aRoute: ActivatedRoute) {

      this.form = this.fb.group({
        nombre: ['',],
        empresasSeguidas: ['', ],
        ubi: ['',],
      })
   
      this.aRoute.url.subscribe(urlSegments => {
        const routeValue = urlSegments[0].path; // Obtener el valor de la ruta
        console.log(routeValue)
        if (routeValue === 'ListaEmpresas') {
          this.dropdownValues = CategoriaValue.values;
        } else if (routeValue === 'ListaBeneficiarios') {
          this.dropdownValues = CategoriaONGValue.values;
        }
      });
      
   }  

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        
      }
    }
    this.route = this.router.url;
    this.logged = token !== "";
  }

   
  onDropdownChange(selectedValue: any) {     
    const nombreSelected =this.dropdownValues.find((value:any) => value.id+"" === selectedValue?.target.value)?.name;
    if (selectedValue?.target.checked) {
      this.categoria.push(nombreSelected?.toLowerCase());   
    } else {
      const index = this.categoria.indexOf(nombreSelected?.toLowerCase());
      if (index > -1) {
        this.categoria.splice(index, 1);
      }
    }
  }

  onTipoOrdenChange(event: any) {
    this.tipoOrden = event.target.id;
    if (this.tipoOrden === "0") {
      // Desseleccionar las otras casillas
      const radioButtons = document.getElementsByName("orden");
      for (let i = 0; i < radioButtons.length; i++) {
        (radioButtons[i] as HTMLInputElement).checked = false;
      }
    }
  }

  borrarFiltros(event: any) {    

      const radioButtons = document.getElementsByName("orden");
      for (let i = 0; i < radioButtons.length; i++) {
        (radioButtons[i] as HTMLInputElement).checked = false;
      }
      const checkBox =  document.getElementsByName("categoria");
      for (let i = 0; i < checkBox.length; i++) {
        (checkBox[i] as HTMLInputElement).checked = false;
      }
      const seguidos =  document.getElementsByName("seguidos");
      for (let i = 0; i < seguidos.length; i++) {
        (seguidos[i] as HTMLInputElement).checked = false;
      }
      this.form.reset();
  }

  reset(){
    if(this.route.includes("ListaBeneficiarios")){
      this._beneficiario.disparador.emit({})
    }else if(this.route.includes("ListaEmpresas")){
      this._empresa.disparador.emit({})
    }
  }
  //
  checkUser(): boolean{
    return this.route.includes(this.role)
  }

  applyFilter(event: Event) {
    var nombre =this.form.get('nombre')?.value;
    var ubi = this.form.get('ubi')?.value
    var followed = this.form.get('empresasSeguidas')?.value
    var categoriaDisp = this.categoria;
    var orden = this.tipoOrden
    if(this.route.includes("ListaBeneficiarios")){
      this._beneficiario.disparador.emit({nombre,ubi,followed,categoriaDisp,orden})
    }else if(this.route.includes("ListaEmpresas")){
      this._empresa.disparador.emit({nombre,ubi,followed,categoriaDisp,orden})
    }
    }

  toggleSeguidos() {
    this.isSeguidosOpen = !this.isSeguidosOpen;
  }

  toggleOrdenar() {
    this.isOrdenarOpen = !this.isOrdenarOpen;
  }
 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleNombre() {
    this.isNombreOpen = !this.isNombreOpen;
  }

  toggleUbi() {
    this.isUbiOpen = !this.isUbiOpen;
  }
  
}

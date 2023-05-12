import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';

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
    private router: Router) {

      this.form = this.fb.group({
        nombre: ['',],
        empresasSeguidas: ['', ],
        ubi: ['',],
      })
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
    const nombreSelected =this.dropdownValues.find(value => value.id+"" === selectedValue?.target.value)?.name;
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

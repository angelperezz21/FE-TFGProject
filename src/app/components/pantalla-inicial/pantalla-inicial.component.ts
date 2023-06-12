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
import { ToastrService } from 'ngx-toastr';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { DonacionService } from 'src/app/service/donacion.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { NecesitaService } from 'src/app/service/necesita.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-pantalla-inicial',
  templateUrl: './pantalla-inicial.component.html',
  styleUrls: ['./pantalla-inicial.component.css']
})
export class PantallaInicialComponent implements OnInit {
  busqueda: any;
  donaciones: any;
  empresas: any;
  beneficiarios: any;
  recursos: any;
  necesidades: any;
  tokenId: any;
  id: any;
  role: any;
  helper = new JwtHelperService();
  objetosSolicitados: any;
  hoveredId: number | null = null;
  /**
   *
   */
  /**
   *
   */

  constructor(private _donacion: DonacionService,
    private _empresa: EmpresaService,
    private _beneficiario: BeneficiarioService,
    private _necesita: NecesitaService,
    private _recurso: RecursoService,
    private toastr: ToastrService) {

  }
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;        
        this.misObjetosSolicitados();
        console.log("adios")
      }
    }
    
    this.busqueda='/ListaRecursos'    
    this._donacion.getTotalDonaciones().subscribe(data=>{
      this.donaciones=data;
    })
    this._empresa.getTotalEmpresas().subscribe(data=>{
      this.empresas=data;
    })
    this._beneficiario.getTotalBeneficiarios().subscribe(data=>{
      this.beneficiarios=data;
    })
    this._necesita.getNecesidadesNuevas().subscribe(data=>{
      this.necesidades=data;
      console.log(data)
    })
    this._recurso.getRecursosNuevos().subscribe(data=>{
      this.recursos=data;
      
    })
  }


  onCardMouseEnter(recursoId: number): void {
    this.hoveredId = recursoId;
  }

  onCardMouseLeave(): void {
    this.hoveredId = null;
  }

  onDropdownChange(selectedValue: any) {
    this.busqueda = selectedValue?.target.value;  
    console.log(this.busqueda)
  }

  buscar(){
    window.location.href=this.busqueda;
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

  objetoSolicitado(objeto: any): boolean {        
    console.log(this.objetosSolicitados)
    console.log(objeto)
    return this.objetosSolicitados.some((x: any) => x.id === objeto.id);    
  }

  misObjetosSolicitados(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.role==='Beneficiario'){       
      this._recurso.getMySolicitudesRecursos(this.id,{headers}).subscribe(data=>{      
        this.objetosSolicitados = data;      
      })
    }    
    if(this.role==='Empresa'){
      this._necesita.getMySolicitudesNecesitas(this.id,{headers}).subscribe(data=>{      
        this.objetosSolicitados = data;      
      })
    }
  }


  solicitarObjeto(idRecurso: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(this.role==='Beneficiario'){
      this._recurso.solicitarRecurso(idRecurso,this.id,{headers}).subscribe(data=>{        
        this.misObjetosSolicitados();
      });
    }    
    if(this.role==='Empresa'){
      this._necesita.solicitarNecesidad(idRecurso,this.id,{headers}).subscribe(data=>{        
        this.misObjetosSolicitados();
      });
    }
  }






  haz(){
    const token = localStorage.getItem('token');             
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
    this.toastr.info("La tarjeta ha sido actualizada con exito", 'Tarjeta actualizada');
    this.toastr.error("FALLO");
    this.toastr.success("SUBIDO CON EXITO");
   // const options = { headers: header, responseType: 'blob' };
    this._donacion.getCertificado(6,{headers: headers}).subscribe((data)=>{        
      window.open('https://easydonation.azurewebsites.net/' + data.certificadoPath, '_blank');
    })
  }
}

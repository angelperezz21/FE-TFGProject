import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    private _recurso: RecursoService) {

  }
  ngOnInit(): void {
    this.busqueda='/Explorar'    
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
    })
    this._recurso.getRecursosNuevos().subscribe(data=>{
      this.recursos=data;
    })
  }

  onDropdownChange(selectedValue: any) {
    this.busqueda = selectedValue?.target.value;  
    console.log(this.busqueda)
  }

  buscar(){
    window.location.href=this.busqueda;
  }

  haz(){
    const token = localStorage.getItem('token');             
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
    
   // const options = { headers: header, responseType: 'blob' };
    this._donacion.getCertificado(6,{headers: headers}).subscribe((data)=>{        
      window.open('https://localhost:44318/' + data.certificadoPath, '_blank');
    })
  }
}

import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-listar-seguidos',
  templateUrl: './listar-seguidos.component.html',
  styleUrls: ['./listar-seguidos.component.css']
})
export class ListarSeguidosComponent implements OnInit{
  empresas: any;
  seguidos: any;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;

  constructor( private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService    ) {
  }

  ngOnInit(): void {
    this.obtenerMisSeguidos();
    console.log("pulso")
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
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
        this.seguidos = data;
      })}}
    else{      
      if(this.id!=null){this._empresaService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
        this.seguidos = data;
      })}}
    
  }

  dejarSeguir(idSeguido: number ){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(idSeguido)
    if(this.role==='Beneficiario'){    
      if(this.id!=null){this._beneficiarioService.unfollowEmpresa(idSeguido,this.id,{headers}).subscribe(data=>{
          if(this.id!=null)this._beneficiarioService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
            this.seguidos = data;
          })
      })}
    }
    else{      
      if(this.id!=null){this._empresaService.unfollowBeneficiario(idSeguido,this.id,{headers}).subscribe(data=>{
          if(this.id!=null)this._empresaService.getListaSeguidos(this.id,{headers}).subscribe(data=>{
            this.seguidos = data;
          })
      })}
    }
    
  }



}


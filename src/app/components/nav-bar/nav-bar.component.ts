import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JwtModule }from '@auth0/angular-jwt'
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role!: string;
  numNotificaciones!: number

  constructor(private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService) {
    
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

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){      
      if(token!==""){                
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
        if(this.helper.decodeToken(token).role==='Empresa'){
          this._empresaService.getNotificaciones(this.helper.decodeToken(token).unique_name, {headers}).subscribe(data=>{
            console.log("hola")
            console.log(data)
            this.numNotificaciones =data;
          })
        }else{          
          this._beneficiarioService.getNotificaciones(this.helper.decodeToken(token).unique_name, {headers}).subscribe(data=>{
            this.numNotificaciones =data;
          })
        }
        this._empresaService.disparadorNotificaciones.subscribe(data=>{
          this.numNotificaciones = data;
        })
        this._beneficiarioService.disparadorNotificaciones.subscribe(data=>{
          this.numNotificaciones = data;
        })
      }
    }
    
  }

  cerrarSesion(): boolean{
    localStorage.setItem('token',"")
    window.location.reload();    
    return true
  }
}

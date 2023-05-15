import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarNecesidadesService } from 'src/app/service/listar-necesidades.service';
import { NecesitaService } from 'src/app/service/necesita.service';

@Component({
  selector: 'app-listar-mis-necesidades',
  templateUrl: './listar-mis-necesidades.component.html',
  styleUrls: ['./listar-mis-necesidades.component.css']
})
export class ListarMisNecesidadesComponent implements OnInit{
  necesidades: any;  
  tokenId: any;
  helper = new JwtHelperService();
  id: any;
  role: any;
  logged = false;
  isModalOpen = false;
  solicitantes: any;
  empresa: any;
  necesidadId!: number;
/**
 *
 */
  constructor(private _serviceListarNecesidades: ListarNecesidadesService,
    private _necesidadService: NecesitaService ) {
  }

  ngOnInit(): void {
    this.obtenerNecesidades();
    
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

  
  onDropdownChange(selectedValue: any) {
    console.log(selectedValue?.target.value)
    this.empresa = selectedValue?.target.value;
  }

  openModal(idNecesidad: number) {
    this.isModalOpen = true;
    this.necesidadId = idNecesidad;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._necesidadService.getNotificaciones(idNecesidad,{headers} ).subscribe(data=>{
      this.solicitantes = data;  
      this.empresa = data[0]['id'];
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  obtenerNecesidades(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(token!==null){
      this._necesidadService.getMyListNecesidades(this.helper.decodeToken(token).unique_name).subscribe(data=>{
        this.necesidades=data;             
      })
    }
  }

  aceptarNecesidad(){    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.empresa)
    this._necesidadService.aceptarNecesidad(this.necesidadId,this.empresa,{headers}).subscribe(data=>{
      this.obtenerNecesidades();
    });
   
  }


}

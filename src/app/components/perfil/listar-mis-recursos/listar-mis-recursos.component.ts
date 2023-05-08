
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarRecursosService } from 'src/app/service/listar-recursos.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-listar-mis-recursos',
  templateUrl: './listar-mis-recursos.component.html',
  styleUrls: ['./listar-mis-recursos.component.css']
})
export class ListarMisRecursosComponent implements OnInit{
  recursos: any;
  recursosFiltro: any;
  tokenId: any;
  helper = new JwtHelperService();
  id: any;
  role: any;
  logged = false;
  isModalOpen = false;
  solicitantes: any;
  beneficiario: any;
  recursoId!: number;
/**
 *
 */
  constructor(private _serviceListarRecursos: ListarRecursosService,
    private _recursoService: RecursoService ) {
  }

  ngOnInit(): void {
    this.obtenerRecursos();
    
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
    this.beneficiario = selectedValue?.target.value;
  }

  openModal(idRecurso: number) {
    this.isModalOpen = true;
    this.recursoId = idRecurso;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.getNotificaciones(idRecurso,{headers} ).subscribe(data=>{
      this.solicitantes = data;  
      this.beneficiario = data[0]['id'];
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  obtenerRecursos(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    if(token!==null){
      this._recursoService.getMyListRecursos(this.helper.decodeToken(token).unique_name).subscribe(data=>{
        this.recursos=data;
        this.recursosFiltro = data;        
      })
    }
  }

  aceptarRecurso(){    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.beneficiario)
    this._recursoService.aceptarRecurso(this.recursoId,this.beneficiario,{headers}).subscribe(data=>{console.log("hola")});
   
  }



}

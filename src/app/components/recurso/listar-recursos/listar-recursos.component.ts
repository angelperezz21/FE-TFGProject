import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarRecursosService } from 'src/app/service/listar-recursos.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-listar-recursos',
  templateUrl: './listar-recursos.component.html',
  styleUrls: ['./listar-recursos.component.css']
})
export class ListarRecursosComponent implements OnInit{
  recursos: any;
  recursosFiltro: any;
  recursosSolicitados: any;
  tokenId: any;
  helper = new JwtHelperService();
  id: any;
  role: any;
  logged = false;
  metodos: any = [];
  tipoOrden!: string;
  hoveredId: number | null = null;
  page!: number;
/**
 *
 */
  constructor(private _serviceListarRecursos: ListarRecursosService,
    private _recursoService: RecursoService ) {
  }

  ngOnInit(): void {
    this._serviceListarRecursos.disparador.subscribe(data=>{      
      this.aplicarFiltros(data.nombre,parseInt(data.precioMin), parseInt(data.precioMax),data.cantidad,data.metodo,data.orden);
    })
    this.obtenerRecursos();
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        this.misRecursosSolicitados();
      }
    }
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

  onCardMouseEnter(recursoId: number): void {
    this.hoveredId = recursoId;
  }

  onCardMouseLeave(): void {
    this.hoveredId = null;
  }


  obtenerRecursos(){
    this._recursoService.getListRecursos().subscribe(data=>{
      this.recursos=data;
      this.recursosFiltro = data;
      this.recursosFiltro.sort((a:any, b:any) => {
        return new Date(b.fechaCreacionRecurso).getTime() - new Date(a.fechaCreacionRecurso).getTime();
      });
      console.log(data)
      
    })
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

  recursoSolicitado(recurso: any): boolean {        
    return this.recursosSolicitados.some((x: any) => x.id === recurso.id);    
  }

  solicitarRecurso(idRecurso: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.solicitarRecurso(idRecurso,this.id,{headers}).subscribe(data=>{
      console.log("recurso Solicitado")
      this.misRecursosSolicitados();
    });
  }

  misRecursosSolicitados(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this._recursoService.getMySolicitudesRecursos(this.id,{headers}).subscribe(data=>{      
      this.recursosSolicitados = data;      
    })
  }

  //nombre,precioMin,precioMax,cantidad,metodo,orden

  aplicarFiltros(nombre:string,precioMin: number,precioMax:number, cantidad:string,metodo:any, orden:string){

    this.metodos = metodo;
    this.tipoOrden = orden;

    this.recursosFiltro = this.recursos.filter((recurso : any) => 
  { 
    const precioR = parseInt(recurso.precio);    
    const cantidadR = recurso.cantidad.toString();
    const nombreR = recurso.nombre?.toLowerCase();
    const metodoR = recurso.metodoEntrega?.toLowerCase();

    if(this.tipoOrden!=="0"){
      this.recursos.sort((a : any, b :any) => {
        if (this.tipoOrden === "1") {
          return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
        } else if(this.tipoOrden === "-1"){
          return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase());
        }else if(this.tipoOrden === "2"){
          return  parseInt(b.precio) - parseInt(a.precio);
        }else if(this.tipoOrden === "-2"){
          return  parseInt(a.precio) - parseInt(b.precio);
        }
      });    
    }

    const nombreValido = nombre ? nombreR.includes(nombre) : true;
    const cantidadValida = cantidad ? cantidadR === (cantidad) : true;
    const metodoValido = this.metodos!==undefined && this.metodos.length>0 ? this.metodos.includes(metodoR) : true;
    const precioValido = (precioMin!==0 && !Number.isNaN(precioMin))|| (precioMax!=10000 && !Number.isNaN(precioMin))  ? precioMin <= precioR && precioMax >=precioR : true;

    return nombreValido && cantidadValida && metodoValido && precioValido;
  } );
  } 
}

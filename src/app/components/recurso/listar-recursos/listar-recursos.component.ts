import { Component, OnInit } from '@angular/core';
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
/**
 *
 */
  constructor(private _serviceListarRecursos: ListarRecursosService,
    private _recursoService: RecursoService ) {
  }

  ngOnInit(): void {
    this._serviceListarRecursos.disparador.subscribe(data=>{
      this.aplicarFiltros(data.nombre,data.cantidad,data.precio);
    })
    this.obtenerRecursos();
  }

  obtenerRecursos(){
    this._recursoService.getListRecursos().subscribe(data=>{
      this.recursos=data;
      this.recursosFiltro = data;
      console.log(data)
      
    })
  }
  aplicarFiltros(nombre:string,cantidad:string,precio:string){
    this.recursosFiltro = this.recursos.filter((recurso : any) => 
  { 
    const precioR = recurso.precio.toString();
    const cantidadR = recurso.cantidad.toString();
    const nombreR = recurso.nombre?.toLowerCase();

    const nombreValido = nombre ? nombreR.includes(nombre) : true;
    const cantidadValida = cantidad ? cantidadR === (cantidad) : true;
    const precioValido = precio ? precioR === (precio) : true;
  
    return nombreValido && cantidadValida && precioValido;
  } );
  } 
}

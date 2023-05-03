import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListarNecesidadesService } from 'src/app/service/listar-necesidades.service';
import { ListarRecursosService } from 'src/app/service/listar-recursos.service';
import { NecesitaService } from 'src/app/service/necesita.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit{
  objetosFiltros: string |undefined;
  form: any;
  categoria!: string;



  constructor( private fb: FormBuilder,
    private _serviceListarRecursos: ListarRecursosService,
    private _serviceListarNecesidades: ListarNecesidadesService,
    ) {

      this.form = this.fb.group({
        nombre: ['', ],
        precio: ['',],
        cantidad: ['',],
      })
   }

  ngOnInit(): void {
  }

  onDropdownChange(selectedValue: any) {
    console.log(selectedValue?.target.value)
    this.categoria = selectedValue?.target.value;
  }

  applyFilter(event: Event) {
    var nombre =this.form.get('nombre')?.value;
    var precio = this.form.get('precio')?.value
    var cantidad = this.form.get('cantidad')?.value
    if(this.categoria!=='Necesidad'){
      this._serviceListarRecursos.disparador.emit({nombre,precio,cantidad})
    }else{
      this._serviceListarNecesidades.disparador.emit({nombre,precio,cantidad})
    }
    }
}

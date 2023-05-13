import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarNecesidadesService } from 'src/app/service/listar-necesidades.service';
import { ListarRecursosService } from 'src/app/service/listar-recursos.service';
import { NecesitaService } from 'src/app/service/necesita.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { MetodoValue } from 'src/app/shared/metodo.module';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit{
  objetosFiltros: string |undefined;
  form: any;
  categoria!: string;
  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role: any;
  route!: string;
  metodos: any =[] ;
  dropdownValues = MetodoValue.values;  
  isOrdenarOpen = false;
  isMetodoOpen = false;
  isNombreOpen = false;
  isCantidadOpen = false;
  isPrecioOpen = false;
  tipoOrden: any;
  rangoMin!: number;
  rangoMax!: number;



  constructor( private fb: FormBuilder,
    private _serviceListarRecursos: ListarRecursosService,
    private _serviceListarNecesidades: ListarNecesidadesService,
    private router: Router) {

      this.form = this.fb.group({
        nombre: ['', ],
        cantidad: ['',],
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
    console.log(this.route)
    this.logged = token !== "";

    const range1 = document.getElementById("customRange1") as HTMLInputElement;
    const range2 = document.getElementById("customRange2") as HTMLInputElement;
    const rangeValue1 = document.getElementById("rangeValue1") as HTMLParagraphElement;
    const rangeValue2 = document.getElementById("rangeValue2") as HTMLParagraphElement;
        
    let rangoMin = 0; // establecer el valor mínimo del segundo rango
    
    // función que se ejecuta cuando se cambia el valor de los rangos
    function setRanges() {
      const minRange1 = parseFloat(range1.value);
      const maxRange2 = parseFloat(range2.value);
    
      // actualiza el valor mínimo del segundo rango
      range2.min = minRange1.toString();
      rangoMin = minRange1;
    
      // actualiza el valor máximo del primer rango
      range1.max = maxRange2.toString();
    
      // muestra el valor actual de cada rango en los elementos p correspondientes
      rangeValue1.textContent = `Min: ${range1.value} €`;
      rangeValue2.textContent = `Max: ${range2.value} €`;
    }
    
    range1.addEventListener("input", setRanges);
    range2.addEventListener("input", setRanges);
    
    // muestra los valores iniciales de los rangos en los elementos p correspondientes
    rangeValue1.textContent = `Min: ${range1.value} €` ;
    rangeValue2.textContent = `Max: ${range2.value} €`;
  }

  borrarFiltros(event: any) {    

    const radioButtons = document.getElementsByName("orden");
    for (let i = 0; i < radioButtons.length; i++) {
      (radioButtons[i] as HTMLInputElement).checked = false;
    }
    const checkBox =  document.getElementsByName("entrega");
    for (let i = 0; i < checkBox.length; i++) {
      (checkBox[i] as HTMLInputElement).checked = false;
    }
    const precio =  document.getElementsByName("precio");
    for (let i = 0; i < precio.length; i++) {
      (precio[i] as HTMLInputElement).value = "0";
    }
    this.form.reset();
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

  onMetodoChange(selectedValue: any) {     
    const nombreSelected =this.dropdownValues.find(value => value.id+"" === selectedValue?.target.value)?.name;
    if (selectedValue?.target.checked) {
      this.metodos.push(nombreSelected?.toLowerCase());   
    } else {
      const index = this.metodos.indexOf(nombreSelected?.toLowerCase());
      if (index > -1) {
        this.metodos.splice(index, 1);
      }
    }
  }

  applyFilter(event: Event) {
    var nombre =this.form.get('nombre')?.value;
    var precioMin = (document.getElementById("customRange1") as HTMLInputElement).value;
    var precioMax = (document.getElementById("customRange2") as HTMLInputElement).value;
    var cantidad = this.form.get('cantidad')?.value
    var metodo = this.metodos;
    var orden = this.tipoOrden;


    if(this.route==='/ListaRecursos'){      
      this._serviceListarRecursos.disparador.emit({nombre,precioMin,precioMax,cantidad,metodo,orden})
    }else{
      this._serviceListarNecesidades.disparador.emit({nombre,precioMin,precioMax,cantidad,orden})
    }
  }

  togglePrecio() {
    this.isPrecioOpen = !this.isPrecioOpen;
  }
 
  toggleOrdenar() {
    this.isOrdenarOpen = !this.isOrdenarOpen;
  }
 
  toggleMetodo() {
    this.isMetodoOpen = !this.isMetodoOpen;
  }
  
  toggleNombre() {
    this.isNombreOpen = !this.isNombreOpen;
  }

  toggleCantidad() {
    this.isCantidadOpen = !this.isCantidadOpen;
  }
}

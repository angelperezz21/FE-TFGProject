import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListarNecesidadesService } from 'src/app/service/listar-necesidades.service';
import { NecesitaService } from 'src/app/service/necesita.service';

@Component({
  selector: 'app-listar-necesita',
  templateUrl: './listar-necesita.component.html',
  styleUrls: ['./listar-necesita.component.css']
})
export class ListarNecesitaComponent implements OnInit{
  necesita: any;
  necesidadFiltro: any;
  tokenId: any;
  id: any;
  role: any;
  helper = new JwtHelperService();
  logged=false;

  constructor(private _serviceListarNecesidades: ListarNecesidadesService,
      private _necesitaService: NecesitaService ) {
  }

  ngOnInit(): void {
    this._serviceListarNecesidades.disparador.subscribe(data=>{
      this.aplicarFiltros(data.nombre,data.cantidad,data.precio);
    })
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

  obtenerNecesidades(){
    this._necesitaService.getListNecesidades().subscribe(data=>{
      this.necesita=data;
      this.necesidadFiltro = data;
      console.log(data)
      
    })
  }

  solicitarNecesidad(){

  }

  aplicarFiltros(nombre:string,cantidad:string,precio:string){
    this.necesidadFiltro = this.necesita.filter((necesita : any) => 
  { 
    const precioR = necesita.precio.toString();
    const cantidadR = necesita.cantidad.toString();
    const nombreR = necesita.nombre?.toLowerCase();

    const nombreValido = nombre ? nombreR.includes(nombre) : true;
    const cantidadValida = cantidad ? cantidadR === (cantidad) : true;
    const precioValido = precio ? precioR === (precio) : true;
  
    return nombreValido && cantidadValida && precioValido;
  } );
  } 
}

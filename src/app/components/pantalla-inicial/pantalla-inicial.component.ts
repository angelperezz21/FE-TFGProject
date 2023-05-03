import { Component, OnInit } from '@angular/core';
import { DonacionService } from 'src/app/service/donacion.service';

@Component({
  selector: 'app-pantalla-inicial',
  templateUrl: './pantalla-inicial.component.html',
  styleUrls: ['./pantalla-inicial.component.css']
})
export class PantallaInicialComponent implements OnInit{
  /**
   *
   */
  constructor(private _donacionService: DonacionService) {
    
    
  }
  ngOnInit(): void {
    this._donacionService.verificarEmpresaPorCIF("A46050217").subscribe(data=>{console.log(data)}, errors=>{console.log(errors)})
  }

}

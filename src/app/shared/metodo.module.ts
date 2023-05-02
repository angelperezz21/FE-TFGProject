import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MetodoValue { 
    static values = [
        { id: 1, name: 'Avión' },
        { id: 2, name: 'Tren' },
        { id: 3, name: 'Camión' },
        { id: 4, name: 'Barco' }
      ];
}
